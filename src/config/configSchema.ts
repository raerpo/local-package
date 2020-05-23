import { Schema } from 'jsonschema';

const jsonConfigSchema: Schema = {
  id: '/JsonConfig',
  type: 'object',
  properties: {
    packages: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
          },
          url: {
            type: 'string',
          },
          files: {
            type: 'array',
            items: {
              type: 'string',
            },
          },
          dest: {
            type: 'string',
          },
        },
        required: ['name', 'url', 'files', 'dest'],
      },
    },
  },
};

export default jsonConfigSchema;
