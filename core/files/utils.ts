import multer from "multer";

const upload = multer();

export function multerFiles(...names: string[]) {
    return upload.fields(
        names.map(name => ({name}))
    );
}
// export function multerFile(name: string) {
//     return upload.single(name);
// }
import { Request } from 'express';

export function getAllFiles(req: Request): Express.Multer.File[] {
    const files = req.files;
    const file = req.file;

    if (file) return [file];

    if (Array.isArray(files)) return files;

    if (files && typeof files === 'object') {
        return Object.values(files).flat();
    }

    return [];
}

export function getFilesByFieldName(req: Request, fieldName: string): Express.Multer.File[] {
    const files = req.files;
    const file = req.file;

    if (file && file.fieldname === fieldName) return [file];

    if (Array.isArray(files)) {
        return files.filter(f => f.fieldname === fieldName);
    }

    if (files && typeof files === 'object' && !Array.isArray(files)) {
        return (files[fieldName] as Express.Multer.File[]) || [];
    }
    return [];
}
