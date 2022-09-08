function ownedBy(parent, args, context) {
    return context.prisma.choice.findUnique({ where: { id: parent.id } }).ownedBy()
}

function result(parent, args, context) {
    return context.prisma.choice.findUnique({ where: { id: parent.id } }).result()
}

module.exports = {
    ownedBy,
    result
}