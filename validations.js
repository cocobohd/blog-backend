import { body } from 'express-validator';

export const loginValidation = [
    body('email', 'Bad email').isEmail(),
    body('password', 'Length must be min 8 symbols').isLength({ min: 8 }),
];

export const registerValidation = [
    body('email', 'Bad email').isEmail(),
    body('password', 'Length must be min 8 symbols').isLength({ min: 8 }),
    body('fullName', 'Length must be min 3 symbols').isLength({ min: 3 }),
    body('avatarUrl', 'Bad URL').optional().isURL(),
];

export const postCreateValidation = [
    body('title', 'Write title').isLength({ min: 3 }).isString(),
    body('text', 'Write text').isLength({ min: 3 }).isString(),
    body('tags', 'No correct tags').optional().isString(),
    body('imageUrl', 'Bad URL for img').optional().isString(),
];
