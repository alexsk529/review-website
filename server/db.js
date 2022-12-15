import pg from 'pg'
import {Sequelize, DataTypes} from 'sequelize';

const db = new Sequelize('postgres://pyzrbyqn:800XiuGqvT5ifiXRGFHV4c9WN2VBwGDn@dumbo.db.elephantsql.com/pyzrbyqn', {
    dialect: 'postgres',
    define: {
        freezeTableName: true
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
        type: DataTypes.STRING
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
        type: DataTypes.STRING,
        allowNull: false
    },
    rate: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: db.literal('CURRENT_TIMESTAMP')
    }
}, {
    timestamps: false
})

const Work = db.define('work', {
    work_name: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    work_rate: {
        type: DataTypes.INTEGER
    },
    category: {
        type: DataTypes.STRING(30),
        allowNull: false 
    }
},{
    timestamps: false
})

const Tag = db.define('tag', {
    tag_name: {
        type: DataTypes.STRING(30),
        allowNull: false  
    }
},{
    timestamps: false
})

const ReviewTag = db.define('review_tags',{
    review_id: {
        type: DataTypes.INTEGER
    },
    tag_name: {
        type: DataTypes.STRING(30),
        allowNull: false
    }
}, {
    timestamps: false
})

export { db, Author, Review, Comments, Work, ReviewTag, Tag };


