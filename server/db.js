import {Sequelize, DataTypes} from 'sequelize';

const db = new Sequelize('postgres://pyzrbyqn:800XiuGqvT5ifiXRGFHV4c9WN2VBwGDn@dumbo.db.elephantsql.com/pyzrbyqn', {
    dialect: 'postgres',
    define: {
        freezeTableName: true,
        underscored: true
    }
})

const Author = db.define('author', {
    email: {
        type: DataTypes.STRING(50),
        primaryKey: true
    },
    author_name: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    likes: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: db.literal('CURRENT_TIMESTAMP')
    },
    last_login: {
        type: DataTypes.DATE,
        defaultValue: db.literal('CURRENT_TIMESTAMP')
    },
    provider: {
        type: DataTypes.STRING,
        allowNull: false
    },
    subject: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.STRING(10),
        defaultValue: 'user'
    },
    status: {
        type: DataTypes.STRING(10),
        defaultValue: 'unblocked'
    }
}, {
    indexes: [
        {
            unique: true,
            fields: ['provider', 'subject']
        }
    ],
    timestamps: false
})

const Comments = db.define('comments', {
    comment_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: db.literal('CURRENT_TIMESTAMP')
    },
    comment: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(50)
    },
    review_id: {
        type: DataTypes.INTEGER
    }
},{
    timestamps: false 
})

const Review = db.define('review', {
    work_name: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(50)
    },
    review_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    review_title: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    content: {
        type: DataTypes.STRING(10000),
        allowNull: false
    },
    grade: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: db.literal('CURRENT_TIMESTAMP')
    },
    image_url: {
        type: DataTypes.STRING
    }
}, {
    timestamps: false
})

const Work = db.define('work', {
    work_name: {
        type: DataTypes.STRING(50),
        allowNull: false,
        primaryKey: true
    },
    category: {
        type: DataTypes.STRING(30),
        allowNull: false 
    }
},{
    timestamps: false
})

const Rate = db.define('rate', {
    rate_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    work_name: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    rate: {
        type: DataTypes.FLOAT,
    }
}, {
    timestamps: false
})

const Tag = db.define('tag', {
    tag_name: {
        type: DataTypes.STRING(30),
        allowNull: false,
        primaryKey: true  
    }
},{
    timestamps: false
})

const ReviewTag = db.define('review_tags',{
    review_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Review,
            key: 'review_id'
        }
    },
    tag_name: {
        type: DataTypes.STRING(30),
        allowNull: false,
        references: {
            model: Tag,
            key: 'tag_name'
        }
    }
}, {
    timestamps: false
})


Author.hasMany(Review, {foreignKey: 'email'});
Review.belongsTo(Author, {foreignKey: 'email'});

Work.hasMany(Review, {foreignKey: 'work_name'});
Review.belongsTo(Work, {foreignKey: 'work_name'});

Author.hasMany(Rate, {foreignKey: 'email'});
Rate.belongsTo(Author, {foreignKey: 'email'});

Work.hasMany(Rate, {foreignKey:'work_name'});
Rate.belongsTo(Work, {foreignKey: 'work_name'});

Author.hasMany(Comments, {foreignKey: 'email'});
Comments.belongsTo(Author, {foreignKey: 'email'});

Review.hasMany(Comments, {foreignKey: 'review_id'});
Comments.belongsTo(Review, {foreignKey: 'review_id'});


Review.belongsToMany(Tag, {through: ReviewTag, foreignKey: 'review_id', onDelete: 'CASCADE'});
Tag.belongsToMany(Review, {through: ReviewTag, foreignKey: 'tag_name', onDelete: 'CASCADE'});




export { db, Author, Comments, Review, Work, Tag, ReviewTag, Rate };


