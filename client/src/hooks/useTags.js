import React from 'react';
import axios from '../axios.js'

const useTags = () => {
    const [tagsOptions, setTagsOptions] = React.useState([])

    const getTags = async () => {
        const res = await axios.get('/api/work/get-tags')
        const tags = res.data.map(item => item.tag_name)
        setTagsOptions(tags)
    }
    return [tagsOptions, setTagsOptions, getTags];
}

export default useTags;