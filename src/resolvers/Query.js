async function currentUser(parent, args, context) {
    const {userId} = context;
    const user = context.prisma.user.findUnique({
        where: 
        {
            id: userId
        }
    })

    if (user) {
        return user
    } else {
        throw error("user not found!")
    }
}

async function findQuiz(parent, args, context) {
    const { userId } = context;
    
    const quiz = await context.prisma.quiz.findFirst({
        where: {
            ownedBy: {id: userId},
            title: args.title
        }
    })
    return quiz
}

async function getQuizzes(parent, args, context) {
    const { userId } = context;

    const quizzes = await context.prisma.quiz.findMany({
        where: {
            ownedBy: {id: userId}
        }
    })
    return quizzes
}

async function getAllQuizzes(parent, args, context) {
    const { userId } = context;
    const quizzes = await context.prisma.quiz.findMany({
        where: {
            ownedBy: {
                id: {
                    not: userId
                }
            },
            published: true
        }
    })
    return quizzes;
}

async function findTaken(parent, args, context) {
    const { userId } = context;

    const taken = await context.prisma.taken.findFirst({
        where: {
            ownedBy: {id: userId},
            quizId: args.quizId
        }
    })
    
    return taken;
}

async function getAllTaken(parent, args, context) {
    const { userId } = context;

    const takens = await context.prisma.taken.findMany({
        where: {
            ownedBy: {id: userId}
        }
    })
    return takens;
}

module.exports = {
    currentUser,
    findQuiz,
    getQuizzes,
    getAllQuizzes,
    findTaken,
    getAllTaken
}