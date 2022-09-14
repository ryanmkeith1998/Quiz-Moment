function ownedBy(parent, args, context) {
    return context.prisma.others.findUnique({ where: { id: parent.id } }).ownedBy()
}

module.exports = {
    ownedBy,
}