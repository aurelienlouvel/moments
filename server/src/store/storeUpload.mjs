import { createWriteStream, unlink } from "node:fs";
import UPLOAD_DIRECTORY_URL from "../config/UPLOAD_DIRECTORY_URL.mjs";

export default async function storeUpload(upload, params) {
  const { createReadStream } = await upload;
  const stream = createReadStream();
  const storedFileName = `${params.location}/${params.name}.${params.fileType}`;
  const storedFileUrl = new URL(storedFileName, UPLOAD_DIRECTORY_URL);

  await new Promise((resolve, reject) => {
    const writeStream = createWriteStream(storedFileUrl);

    writeStream.on("finish", resolve);

    writeStream.on("error", (error) => {
      unlink(storedFileUrl, () => {
        reject(error);
      });
    });

    stream.on("error", (error) => writeStream.destroy(error));
    stream.pipe(writeStream);
  });

  return storedFileName;
}
