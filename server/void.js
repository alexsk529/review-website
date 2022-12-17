import {db, Author, ReviewTag, Review, Comments, Work} from './db.js';

export async function sync() {
    try {
        await db.sync({alter:true})
        console.log('All models have been synchronized');
    } catch(e) {
        console.log(e);
    }
}

export async function select() {
    const authors = await  Author.findAll({
        where: {
        email: 'alexskv529@gmail.com'
        },
        raw: true
    });
    const data = JSON.parse(JSON.stringify(authors))
    console.log(authors);
    const reviewTags = await ReviewTag.findAll();
    console.log(JSON.stringify(reviewTags, null, 2));
    
    await Work.create({
        work_name: 'Новый фильм',
        category: 'фильмы'
    });
    await Review.create({
        work_name: 'Новый фильм',
        email: 'alexskv529@gmail.com',
        review_title: 'Ужасно',
        content: 'sdfsddsggsfd',
        rate: 3
    })
    
    const works = await Work.findAll();
    const reviews = await Review.findAll();
    console.log(JSON.stringify(works));
    console.log('all reviews: ', JSON.stringify(reviews, null, 2));

    await Comments.create({
        comment: 'fsafdsfs',
        email: 'alexskv529@gmail.com',
        review_id: 1
    })
    const comments = await Comments.findAll();
    console.log(JSON.stringify(comments, null, 2));
}