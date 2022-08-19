// Set up for Sanity Client
    //Import Sanity Client 
import sanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

//Create constant that takes an object as a parameter. Pass in project-specific data from Sanity Manager.
    //Note: Run "sanity manage" command from sanity_ecommerce-project to open up Manager.
export const client = sanityClient({
    projectId: 'uyc34e4c', 
    dataset: 'production',
    apiVersion: '2022-03-10',
    useCdn: true,
    token: process.env.NEXT_PUBLIC_SANITY_API_TOKEN,
})

//Create const for Image Builder (Pass in client as Parameter)
const builder = imageUrlBuilder(client);

//Create constant for url passed for image source
export const urlFor = (source) => builder.image(source);