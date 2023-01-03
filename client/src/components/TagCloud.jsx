import React from 'react';
import axios from '../axios.js';
import { TagCloud as Cloud } from 'react-tagcloud';

const TagCloud = () => {
    const tagsOptions = React.useRef([])

    const getTags = async () => {
        const res = await axios.get('/tags-cloud')
        tagsOptions.current = res.data
    }

    React.useLayoutEffect(() => {
        getTags()
    }, [tagsOptions.current])

    const options = {
        luminosity: 'dark',
        hue: 'pink',
    }

    return (
        <Cloud
            minSize={14}
            maxSize={35}
            tags={tagsOptions.current}
            colorOptions={options}
        />
    );
}

export default TagCloud;