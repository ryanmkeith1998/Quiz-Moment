function links(parent, args, context) {
    return context.prisma.user.findUnique({ where: { id: parent.id } }).links()
}
  
function quizzes(parent, args, context) {
    return context.prisma.user.findUnique({ where: { id: parent.id } }).quizzes()
}

function taken(parent, args, context) {
    return context.prisma.user.findUnique({ where: {id: parent.id } }).taken()
}

module.exports = {
    links,
    quizzes,
    taken,
}