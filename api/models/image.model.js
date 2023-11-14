import mongoose from 'mongoose';

const imageSchema= new mongoose.Schema( {
    id: String,
    name:String,
    images: [
        {
          filename: String,
          data: Buffer,
          contentType: String,
        },
      ],
  });


  const Images = mongoose.model('Image', imageSchema);


  export default Images;

