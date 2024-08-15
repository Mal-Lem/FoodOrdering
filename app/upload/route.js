import {S3Client} from "@aws-sdk/client-s3"
import { access } from "fs";
export async function POST(req) {
  
  const data = await req.formData();
  if(data.get('file')){
    //upload file
    const file = data.get('file');
    const s3Client = new S3Client({
        region:'us-east-1',
        credentials:{
          accessKeyId:process.env.AWS_ACCESS_KEY,
          secretAccesssecret:process.env.AWS_SECRET_KEY,
        },
    })
  }
  return Response.json(true);
}
