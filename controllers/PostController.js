import PostModel from '../models/Post.js';

export const getAll = async (req, res) => {
    try {
        const posts = await PostModel.find().populate('user').exec();

        res.json(posts);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Can`t get posts',
        });
    }
};

export const getOne = async (req, res) => {
    try {
        const postId = req.params.id;

        const post = await PostModel.findOneAndUpdate(
            {
                _id: postId,
            },
            {
                $inc: { viewsCount: 1 },
            },
            {
                returnDocument: 'after',
            },
        )
            .populate('user')
            .exec();

        if (!post) {
            return res.status(404).json({
                message: 'Can`t find post',
            });
        }

        res.json(post);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Can`t get post',
        });
    }
};

export const remove = async (req, res) => {
    try {
        const postId = req.params.id;

        const postForRemove = await PostModel.findOneAndDelete({
            _id: postId,
        })
            .populate('user')
            .exec();

        if (!postForRemove) {
            return res.status(404).json({
                message: 'Can`t find post',
            });
        }

        res.json(postForRemove);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Can`t remove post',
        });
    }
};

export const create = async (req, res) => {
    try {
        const doc = new PostModel({
            title: req.body.title,
            text: req.body.text,
            imageUrl: req.body.imageUrl,
            tags: req.body.tags,
            user: req.userId,
        });

        const post = await doc.save();

        res.json(post);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Can`t create post',
        });
    }
};

export const update = async (req, res) => {
    try {
        const postId = req.params.id;

        const postForUpdate = await PostModel.updateOne(
            {
                _id: postId,
            },
            {
                title: req.body.title,
                text: req.body.text,
                imageUrl: req.body.imageUrl,
                tags: req.body.tags,
                user: req.userId,
            },
        )
            .populate('user')
            .exec();

        if (!postForUpdate) {
            return res.status(404).json({
                message: 'Can`t find post',
            });
        }

        res.json({
            success: true,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Can`t update post',
        });
    }
};
