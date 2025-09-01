import { v2 as cloudinary } from "cloudinary";

const uploadToCloudinary = async (fileData, folderName = "avatars") => {
  try {
    if (!fileData) return null;

    // Function to detect MIME type from buffer
    const getMimeType = (buffer) => {
      if (buffer.length < 4) return 'image/jpeg';
      
      const header = buffer.slice(0, 4);
      
      if (header[0] === 0xFF && header[1] === 0xD8) return 'image/jpeg';
      if (header[0] === 0x89 && header[1] === 0x50 && header[2] === 0x4E && header[3] === 0x47) return 'image/png';
      if (header[0] === 0x47 && header[1] === 0x49 && header[2] === 0x46) return 'image/gif';
      if (header[0] === 0x42 && header[1] === 0x4D) return 'image/bmp';
      if (header[0] === 0x52 && header[1] === 0x49 && header[2] === 0x46 && header[3] === 0x46) return 'image/webp';
      
      return 'image/jpeg'; // Default fallback
    };

    if (Array.isArray(fileData)) {
      const results = [];
      for (const data of fileData) {
        let uploadData = data;
        if (Buffer.isBuffer(data)) {
          // Convert buffer to base64 data URI
          const base64 = data.toString('base64');
          const mimeType = getMimeType(data);
          uploadData = `data:${mimeType};base64,${base64}`;
        }
        const result = await cloudinary.uploader.upload(uploadData, {
          folder: folderName,
          resource_type: "auto",
        });
        results.push({
          public_id: result.public_id,
          url: result.secure_url,
        });
      }
      return results;
    } else {
      let uploadData = fileData;
      if (Buffer.isBuffer(fileData)) {
        // Convert buffer to base64 data URI
        const base64 = fileData.toString('base64');
        const mimeType = getMimeType(fileData);
        uploadData = `data:${mimeType};base64,${base64}`;
      }
      const result = await cloudinary.uploader.upload(uploadData, {
        folder: folderName,
        resource_type: "auto",
      });
      return {
        public_id: result.public_id,
        url: result.secure_url,
      };
    }
  } catch (error) {
    console.error("Cloudinary Upload Error:", error);
    return null;
  }
};



const destroy = async (publicId) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result;
  } catch (error) {
    console.error("Cloudinary Destroy Error:", error);
    return null;
  }
};


export { uploadToCloudinary, destroy };
