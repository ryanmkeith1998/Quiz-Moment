function ownedBy(parent, args, context) {
    return context.prisma.quiz.findUnique({ where: { id: parent.id } }).ownedBy()
}

function questions(parent, args, context) {
    return context.prisma.quiz.findUnique({ where: { id: parent.id } }).questions()
}

function endings(parent, args, context) {
    return context.prisma.quiz.findUnique({ where: { id: parent.id }}).endings()
}
module.exports = {
    ownedBy,
    questions,
    endings
}