function ownedBy(parent, args, context) {
    return context.prisma.taken.findUnique({ where: { id: parent.id } }).ownedBy()
}
 
function others(parent, args, context) {
    return context.prisma.taken.findUnique({ where: { id: parent.id } }).others()
}

module.exports = {
    ownedBy,
    others,
}