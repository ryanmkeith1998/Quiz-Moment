function ownedBy(parent, args, context) {
    return context.prisma.question.findUnique({ where: { id: parent.id } }).ownedBy()
}

function choices(parent, args, context) {
    return context.prisma.question.findUnique({ where: { id: parent.id } }).choices()
}

module.exports = {
    ownedBy,
    choices,
}