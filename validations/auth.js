import { body } from 'express-validator';

export const registerValidation = [
    body('email', 'Bad email').isEmail(),
    body('password', 'Length must be min 8 symbols').isLength({ min: 8 }),
    body('fullName', 'Length must be min 3 symbols').isLength({ min: 3 }),
    body('avatarUrl', 'Bad URL').optional().isURL(),
];
