const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { APP_SECRET } = require('../utils')


async function signup(parent, args, context, info) {
    const password = await bcrypt.hash(args.password, 10)
  
    const user = await context.prisma.user.create({ data: { ...args, password } })
  
    const token = jwt.sign({ userId: user.id }, APP_SECRET)

    return {
        token,
        user,
    }
}


async function login(parent, args, context, info) {
    const user = await context.prisma.user.findUnique({ where: { username: args.username } })
    if (!user) {
        throw new Error('No such user found')
    }
  
    const valid = await bcrypt.compare(args.password, user.password)
    if (!valid) {
        throw new Error('Invalid password')
    }
  
    const token = jwt.sign({ userId: user.id }, APP_SECRET)
  
    return {
        token,
        user,
    }
}


async function deleteAcc(parent, args, context, info) {
    const { userId } = context;
    console.log("userId is ", userId, " inside of deleteAcc");
    const user = await context.prisma.user.delete({ where: { id: userId } })
    if (!user) {
        return true;
    }
    return false;
}


async function createQuiz(parent, args, context, info) {
    const { userId } = context;

    const quiz = await context.prisma.quiz.findFirst({ 
        where: { 
            ownedBy: { id: userId },
            title: args.title
        }
    });

    if (quiz) {
        throw new Error('Quiz with this name already exists!')
    }

    return await context.prisma.quiz.create({
        data: {
            title: args.title,
            description: args.description,
            published: false,
            ownedBy: { connect: { id: userId } },
        }
    })
}


async function addResult(parent, args, context, info) {
    const { userId } = context;
    
    const quiz = await context.prisma.quiz.findFirst({ 
        where: {
            ownedBy: {id: userId},
            title: args.quizTitle
        }
    })
    if (!quiz) {
        throw new Error('Either quiz doesnt exist or you arent logged in or you typed the name in wrong')
    }

    const result = await context.prisma.result.findFirst({ 
        where: { 
            ownedBy: { id: quiz.id },
            name: args.name
        }
    });
    if (result) {
        throw new Error('This result is already in the quiz...')
    }

    return await context.prisma.result.create({
        data: {
            name: args.name,
            description: args.description,
            ownedBy: { connect: { id: quiz.id}}
        }
    })
}


async function addQuestion(parent, args, context, info) {
    const { userId } = context;
    
    const quiz = await context.prisma.quiz.findFirst({ 
        where: {
            ownedBy: {id: userId},
            title: args.quizTitle
        }
    })
    if (!quiz) {
        throw new Error('Either quiz doesnt exist or you arent logged in or you typed the name in wrong')
    }

    const question = await context.prisma.question.findFirst({ 
        where: { 
            ownedBy: { id: quiz.id },
            content: args.content
        }
    });
    if (question) {
        throw new Error('This question is already in the quiz...')
    }

    return await context.prisma.question.create({
        data: {
            content: args.content,
            ownedBy: { connect: { id: quiz.id}}
        }
    })
}


async function addChoice(parent, args, context, info) {
    const { userId } = context;
    
    const quiz = await context.prisma.quiz.findFirst({ 
        where: {
            ownedBy: {id: userId},
            title: args.quizTitle
        }
    })
    if (!quiz) {
        throw new Error('Either quiz doesnt exist or you arent logged in or you typed the name in wrong')
    }

    const question = await context.prisma.question.findFirst({ 
        where: { 
            ownedBy: { id: quiz.id },
            content: args.questionContent
        }
    });
    if (!question) {
        throw new Error('This question doesnt exist...')
    }

    const result = await context.prisma.result.findFirst({
        where: {
            ownedBy: { id: quiz.id},
            name: args.resultName
        }
    })

    if (!result) {
        throw new Error('This result doesnt exist...')
    }

    return await context.prisma.choice.create({
        data: {
            content: args.content,
            value: args.value,
            result: {connect: {id: result.id}},
            ownedBy: { connect: { id: question.id}}
        }
    })
}


async function post(parent, args, context, info) {
    const { userId } = context;
    return await context.prisma.link.create({
        data: {
            url: args.url,
            description: args.description,
            postedBy: { connect: { id: userId } },
        }
    })
}


async function vote(parent, args, context, info) {
    const userId = context.userId
  
    const vote = await context.prisma.vote.findUnique({
        where: {
            linkId_userId: {
                linkId: Number(args.linkId),
                userId: userId
            }
        }
    })
  
    if (Boolean(vote)) {
        throw new Error(`Already voted for link: ${args.linkId}`)
    }
  
    return await context.prisma.vote.create({
        data: {
            user: { connect: { id: userId } },
            link: { connect: { id: Number(args.linkId) } },
        }
    })
}
  
async function getResults(parents, args, context) {
    const { userId } = context;

    const quiz = await context.prisma.quiz.findFirst({
        where: {
            ownedBy: {id: userId},
            title: args.title
        }
    })

    if (!quiz) {
        throw new Error('This quiz does not exist...')
    }

    const results = await context.prisma.result.findMany({
        where: {
            ownedBy: { id: quiz.id }
        }
    })
    return results;
}

async function changeTitle(parents, args, context) {
    const quiz = await context.prisma.quiz.update({
        where: {
            id: args.qid
        },
        data: {
            title: args.title,
            description: args.description
        }
    })
    return quiz;
}

async function changeQuestion(parents, args, context) {
    const question = await context.prisma.question.update({
        where: {
            id: args.qid
        },
        data: {
            content: args.content
        }
    })
    return question;
}

async function changeResult(parents, args, context) {
    const result = await context.prisma.result.update({
        where: {
            id: args.rid
        },
        data: {
            name: args.name,
            description: args.description
        }
    })
    return result;
}

async function changeChoice(parents, args, context) {
    const { userId } = context;

    const quiz = await context.prisma.quiz.findFirst({
        where: {
            ownedBy: {id: userId},
            title: args.quizTitle
        }
    })

    const newResult = await context.prisma.result.findFirst({
        where: {
            ownedBy: {id: quiz.id},
            name: args.newResult
        }
    })

    const choice = await context.prisma.choice.update({
        where: {
            id: args.cid
        },
        data: {
            content: args.content,
            result: { connect: { id: newResult.id}},
            value: args.value
        }
    })
    return choice;
}

async function deleteChoice(parents, args, context) {
    const choice = await context.prisma.choice.delete({
        where: {
            id: args.cid
        }
    })
    if(!choice) {
        return false;
    }
    return true;
}

async function deleteQuestion(parents, args, context) {
    const question = await context.prisma.question.delete({
        where: {
            id: args.qid
        }
    })

    if(!question) {
        return false;
    }
    return true;
}

async function deleteResult(parents, args, context) {
    const result = await context.prisma.result.delete({
        where: {
            id: args.rid
        }
    })

    if(!result) {
        return false;
    }
    return true;
}

async function deleteQuiz(parents, args, context) {
    const quiz = await context.prisma.quiz.delete({
        where: {
            id: args.qid
        }
    })

    if(!quiz) {
        return false;
    }
    return true;
}

async function addTaken(parents, args, context) {
    const { userId } = context;

    const taken = await context.prisma.taken.create({
        data: {
            ...args,
            ownedBy: {connect: {id: userId}}
        }
    })
    return taken;
}

async function addOthers(parents, args, context) {
    const { userId } = context;

    const taken = await context.prisma.taken.findFirst({
        where: {
            ownedBy: {id: userId },
            quizId: args.quizId
        }
    })
    if(!taken) {
        throw new Error('This user has not taken this quiz before');
    }

    const other = await context.prisma.others.create({
        data: {
            name: args.name,
            description: args.description,
            score: args.score,
            ownedBy: {connect: {id: taken.id }}
        }
    })
    console.log(other);

    return other;
}

async function publishQuiz(parents, args, context) {
    const quiz = await context.prisma.quiz.update({
        where: {
            id: args.qid
        },
        data: {
            published: true
        }
    })
    return quiz;
}


module.exports = {
    signup,
    login,
    deleteAcc,
    createQuiz,
    addQuestion,
    addChoice,
    addResult,
    post,
    vote,
    getResults,
    changeTitle,
    changeQuestion,
    changeResult,
    changeChoice,
    deleteChoice,
    deleteQuestion,
    deleteResult,
    deleteQuiz,
    addTaken,
    addOthers,
    publishQuiz,
}