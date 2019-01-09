const { GraphQLScalarType } = require('graphql');
// parent, args, context, info
const cloudinary = require('cloudinary');
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

const resolvers = {
  Query: {
    users: (parent, args, { models }) => {
      return models.users
    },
    user: (parent, { id }, { models }) => {
      const user = models.users.filter(user => user.id === id);
      return user[0];
    },
    me: (parent, args, { me }) => me
  },
  Mutation: {
    makeUser: (parent, { id, name }, { models }) => {
      const user = {
        id,
        name
      };
      models.users.push(user);
      return user;
    },
    removeUser: (parent, { id }, { models }) => {
      let found = false;
      models.users = models.users.filter(user => {
        if (user.id === id) {
          found = true;
        } else {
          return user;
        }
      });
      if (found) {
        return true;
      } else {
        return false;
      }
    },
    uploadImage: async (parent, { id, filename }, { models }) => {
      const path = require('path');
      const mainDir = path.dirname(require.main.filename);
      filename = `${mainDir}/uploads/${filename}`;
      try {
        const photo = await cloudinary.v2.uploader.upload(filename, {
          use_filename: true,
          unique: false
        });
        
        const user = models.users[id - 1];
        user.photo = `${photo.public_id}.${photo.format}`;
        return `${photo.public_id}.${photo.format}`;
      } catch(error) {
        throw new Error(error);
      }      
    }
  },
  User: {
    car: (parent, args, { models }) => {
      return parent.cars.map(carId => models.cars[carId - 1])
    },
    photo: (parent, { options }) => {
      let url = cloudinary.url(parent.photo);
      if (options) {
        // width: Int, q_auto: Boolean, f_auto: Boolean, face: 'face'
        const [ width, q_auto, f_auto, face ] = options;
        const cloudinaryOptions = {
          ...(q_auto === 'true' && { quality: 'auto' }),
          ...(f_auto === 'true' && { fetch_format: 'auto' }),
          ...(face && { crop: 'thumb', gravity: 'face' }),
          width,
          secure: true
        };
        url = cloudinary.url(parent.photo, cloudinaryOptions);
        return url;
      }
      return url;
    }
  },
  CloudinaryOptions: new GraphQLScalarType({
    name: 'CloudinaryOptions',
    parseValue(value) {
      return value;
    },
    serialize(value) {
      return value;
    },
    parseLiteral(ast) {
      return ast.value.split(',');
    }
  })
};

module.exports = resolvers;