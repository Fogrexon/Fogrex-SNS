
const bcrypt = require('bcrypt');
const Puid = require('puid');
const { User, Post, Like } = require('./mongooseSchema');

const SALT_ROUNDS = 10;

exports.userCreate = async ( username, password ) => {
  const users = await User.findOne({ username });
  if (!!users) return false;

  await User.create({
    username,
    password: bcrypt.hashSync(password, SALT_ROUNDS),
    createAt: Date.now(),
  });
  return true;
}

exports.userSignin = async (username, password) => {
  const users = await User.findOne({ username });

  if (!users) return false;
  if(!await bcrypt.compare(password, users.password)) return false;
  return true;
}
exports.getUser = async (username, password) => {
  const user = await User.findOne({ username });

  if (!users) return false;
  return {
    username: user.username,
    createAt: user.createAt,
  };
}

exports.createPost = async(username, text, reply) => {
  if(!reply) reply = null;
  else {
    const p = await Post.findOne({ id: reply });
    if (!p) return false;
  }
  await Post.create({
    id: new Puid().generate(),
    username,
    text,
    createAt: Date.now(),
    reply
  });
  return true;
}

exports.likePost = async (id, username) => {
  const post = await Post.findOne({id});
  const like = await Like.findOne({postid: id, username});
  if(!post) return -2;
  if(!!like) return -1;
  await Like.create({
    postid: id,
    username,
    createAt: Date.now(),
  });

  return true;
}
exports.unlikePost = async (id, username) => {
  const like = await Like.findOne({postid: id, username});
  if(!like) return false;
  await Like.deleteOne({postid: id, username});

  return true;
}

const simplePostGetter = async (post, username) => {
  if(!post) return null;
  const likeNumPromise = Like.find({ postid: post.id });
  const isLikedPromise = Like.findOne({ postid: post.id, username });
  const repliesPromise = Post.find({ reply: post.id });
  const likeNum = (await likeNumPromise).length;
  const isLiked = !!(await isLikedPromise);
  const replies = await repliesPromise;
  const ids = [];
  replies.map((reply) => {
    ids.push(reply.id);
  });

  return {
    id: post.id,
    username: post.username, 
    text: post.text,
    createAt: post.createAt,
    likeNum: likeNum, 
    isLiked: isLiked,
    replied: ids,
  };

}


exports.getLatestPost = async ( username, limit ) => {
  const postsRaw = await Post.find({reply: null}).sort({ createAt: -1 }).limit( limit );
  
  const postsPromise = [];
  postsRaw.map((post) => {
    postsPromise.push(simplePostGetter(post, username));
  });
  return await Promise.all(postsPromise);
}

exports.getLatestLike = async ( username, limit ) => {
  const likesRaw = await Post.find({ username }).sort({ createAt: -1 }).limit( limit );
  
  const postsPromise = [];
  likesRaw.map((like) => {
    postsPromise.push(async () => {
      return await simplePostGetter(await Post.findOne({id: like.postid}), username);
    });
  });
  return await Promise.all(postsPromise);
}

exports.getPostDetail = async (id, username) => {
  const post = await Post.findOne({id});
  if(!post) return null;
  const repliedRaw = await Post.find({reply: id}).sort({createAt: -1});
  const likedRaw = await Like.find({postid: id});
  const likeYou = await Like.findOne({postid: id, username});

  const repliedPromise = [];
  repliedRaw.map((reply) => {
    repliedPromise.push(simplePostGetter(reply, username));
  });

  const replied = Promise.all(repliedRaw);

  return {
    id: post.id,
    username: post.username, 
    text: post.text,
    createAt: post.createAt,
    likes: likedRaw.length, 
    isLiked: !!likeYou,
    reply: await simplePostGetter(await Post.findOne({id: post.reply}), username),
    replied: replied,
  }
}