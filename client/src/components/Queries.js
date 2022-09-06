import { gql } from '@apollo/client';

export const GET_QUIZ = gql`
query get_quiz (
    $title: String!
) {
    findQuiz (
        title: $title
    ) {
        id
        title
        description
        endings {
            id
            name
            description
        }
        questions {
            id
            content
            choices {
                id
                content
                value
                result {
                    id
                    name
                }
            }
        }
        ownedBy {
          id
          username
          name
        }
    }
}
`;

export const GET_USER = gql`
query {
  currentUser {
    id
    name
    username
  }
}
`;

export const GET_QUIZZES = gql`
query {
  getQuizzes {
    id
    title
    description
    published
    endings {
        id
        name
        description
        choices {
          id
          value
        }
    }
    questions {
        id
        content
        choices {
            id
            content
            value
            result {
                id
                name
            }
        }
    }
    ownedBy {
      id
      username
      name
    }
  }
}
`;

export const GET_ALL_QUIZZES = gql`
query {
  getAllQuizzes {
    id
    title
    description
    published
    endings {
        id
        name
        description
        choices {
          id
          value
        }
    }
    questions {
        id
        content
        choices {
            id
            content
            value
            result {
                id
                name
            }
        }
    }
    ownedBy {
      id
      username
      name
    }
  }
}
`;

export const FIND_TAKEN = gql`
query find_taken (
  $quizId: Int!
) {
  findTaken (
    quizId: $quizId
  ) {
    id
    quizName
    name
    description
    score
    others {
      id
      name
      description
      score
    }
  }
}
`;

export const GET_ALL_TAKEN = gql`
query get_all_taken {
  getAllTaken {
    id
    quizName
    name
    description
    score
    others {
      id
      name
      description
      score
    }

  }
}
`;