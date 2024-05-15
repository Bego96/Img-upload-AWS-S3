import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  }
});


export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');
    
    
    const fileContent = await file.arrayBuffer(); 

    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `${new Date().toISOString()}-${file.name}`, 
      Body: fileContent, 
      ContentType: file.type
    };

    const command = new PutObjectCommand(params);
    await s3Client.send(command);
    
    return new Response(JSON.stringify({ message: 'Success' }), { status: 200 });
  } catch (error) {
    console.error('Error:', error);
    return new Response(JSON.stringify({ message: 'Error' }), { status: 500 });
  }
}
