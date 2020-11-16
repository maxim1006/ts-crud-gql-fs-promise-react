import fs from 'fs';
import path from 'path';

export const readFileJSON = async (dataPath: string) =>
    JSON.parse(
        await fs.promises.readFile(path.resolve(process.cwd(), dataPath), {
            encoding: 'utf-8',
        })
    );

export const writeFileJSON = async (dataPath: string, data: any) =>
    await fs.promises.writeFile(path.resolve(process.cwd(), dataPath), JSON.stringify(data), {
        encoding: 'utf-8',
    });
