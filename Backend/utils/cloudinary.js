import fs from 'fs';
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
dotenv.config(
    {
        path: './.env'
    }
);

cloudinary.config({
    cloud_name: "df4lo119r",
    api_key:  "542595976431635",
    api_secret:  "XyCckxHozPhjxqxRdP2EeZxtGpc"
});

const uploadOnCloudinary = (filePath) => {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload(filePath, (error, result) => {
            if (error) {
                reject(error);
            }
            // fs.unlinkSync(filePath);
            resolve(result.secure_url); 
        });
    });
};


export {uploadOnCloudinary};