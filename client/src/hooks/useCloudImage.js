import { Cloudinary } from '@cloudinary/url-gen';
import { fill } from '@cloudinary/url-gen/actions/resize';
import { autoGravity } from "@cloudinary/url-gen/qualifiers/gravity";

const useCloudImage = (image_url) => {
    const cld = new Cloudinary({
        cloud: {
            cloudName: 'dn3ymq77w'
        }
    })

    const myImage = cld.image(image_url);
    myImage.resize(fill().width(400).height(300).gravity(autoGravity()));

    const myImageMobile = cld.image(image_url);
    myImageMobile.resize(fill().width(280).height(180).gravity(autoGravity()));

    const imageMain = cld.image(image_url, {width: 'auto', client_hints: "true", crop: 'limit', sizes: '100vw'});
    //imageMain.resize(fill().height(300).gravity(autoGravity()));

    return [myImage, myImageMobile, imageMain];
}

export default useCloudImage;