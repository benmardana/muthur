import { createApi } from 'unsplash-js';
import nodeFetch from 'node-fetch';
import { assert, Message } from 'utils';
import realmInstance from 'store/realm';
import shortUUID from 'short-uuid';

assert(process.env.UNSPLASH_ACCESS_KEY);

const serverApi = createApi({
  accessKey: process.env.UNSPLASH_ACCESS_KEY,
  fetch: nodeFetch,
});

const getRandomInt = (min: number, max: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const modifiers = [
  '',
  ' cat',
  ' cats',
  ' dog',
  ' dogs',
  ' puppy',
  ' puppies',
  ' kitten',
  ' kittens',
  ' animal',
  ' animals',
  ' panda',
];

export default {
  handle: async ({ say }: Message) => {
    const result = await serverApi.search.getPhotos({
      query: `cute${modifiers[getRandomInt(0, modifiers.length - 1)]}`,
    });

    const url = result.response?.results[getRandomInt(0, 9)].urls.regular;

    if (url) {
      const existingPhoto = realmInstance.objectForPrimaryKey('Photo', url);

      if (!existingPhoto) {
        realmInstance.write(() => {
          realmInstance.create('Photo', {
            url,
          });
        });
      }

      await say(`${url}#${shortUUID.generate()}`);
      return;
    }

    const existingPhotos = realmInstance.objects<{ url: string }>('Photo');

    await say(
      `${
        existingPhotos[getRandomInt(0, existingPhotos.length - 1)]?.url
      }#${shortUUID.generate()}` ?? "No cute found '("
    );
  },
};

export const custom = async ({ say, context }: Message) => {
  const thing = context.matches?.[1];

  const result = await serverApi.search.getPhotos({
    query: `cute ${thing}`,
  });

  const url = result.response?.results[getRandomInt(0, 9)].urls.regular;

  if (url) {
    const existingPhoto = realmInstance.objectForPrimaryKey('Photo', url);

    if (!existingPhoto) {
      realmInstance.write(() => {
        realmInstance.create('Photo', {
          url,
        });
      });
    }

    await say(`${url}#${shortUUID.generate()}`);
    return;
  }

  const existingPhotos = realmInstance.objects<{ url: string }>('Photo');

  await say(
    `${
      existingPhotos[getRandomInt(0, existingPhotos.length - 1)]?.url
    }#${shortUUID.generate()}` ?? "No cute found '("
  );
};
