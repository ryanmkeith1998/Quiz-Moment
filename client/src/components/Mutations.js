import { gql } from '@apollo/client';

export const QUESTION_CREATION = gql`
mutation add_question (
  $content: String!
  $quizTitle: String!
) {
  addQuestion (
    content: $content,
    quizTitle: $quizTitle
  ) {
    id
    content
  }
}
`;

export const CHANGE_QUESTION = gql`
mutation change_question (
  $qid: Int!
  $content: String!
) {
  changeQuestion (
    qid: $qid
    content: $content
  ) {
    id
    content
  }
}
`;

export const ELIM_QUESTION = gql`
mutation delete_question (
  $qid: Int!
) {
  deleteQuestion (
    qid: $qid
  ) {
    result
  }
}
`;

export const GET_RESULTS = gql`
mutation get_results (
  $title: String!
) {
  getResults (
    title: $title
  ) {
    name
  }
}
`;

export const SUBMIT_CHOICE = gql`
mutation add_choice (
  $quizTitle: String!,
  $questionContent: String!,
  $content: String!,
  $resultName: String!,
  $value: Int!
) {
  addChoice (
    quizTitle: $quizTitle,
    questionContent: $questionContent,
    content: $content,
    resultName: $resultName,
    value: $value
  ) {
    content
    value
    result {
      id
      name
      description
    }
  }
}
`;

export const CHANGE_CHOICE = gql`
mutation change_choice (
  $cid: Int!
  $quizTitle: String!
  $newResult: String!
  $content: String!
  $value: Int!
) {
  changeChoice (
    cid: $cid
    quizTitle: $quizTitle
    newResult: $newResult
    content: $content
    value: $value
  ) {
    id
    content
    value
    result {
      id
      name
    }
  }
}
`;

export const ELIM_CHOICE = gql`
mutation eliminate_choice (
  $cid: Int!
) {
  deleteChoice (
    cid: $cid
  ) {
    result
  }
}
`;

export const RESULT_CREATION = gql`
mutation add_result (
  $name: String!
  $description: String!
  $quizTitle: String!
) {
  addResult (
    name: $name,
    description: $description,
    quizTitle: $quizTitle
  ) {
    id
    name
    description
  }
}
`;

export const CHANGE_RESULT = gql`
mutation change_result (
  $rid: Int!
  $name: String!
  $description: String!
) {
  changeResult (
    rid: $rid,
    name: $name,
    description: $description
  ) {
    id
    name
    description
  }
}
`;

export const ELIM_RESULT = gql`
mutation delete_result (
  $rid: Int!
) {
  deleteResult (
    rid: $rid
  ) {
    result
  }
}
`;

export const ELIM_QUIZ = gql`
mutation delete_quiz (
    $qid: Int!
) {
    deleteQuiz (
        qid: $qid
    ) {
        result
    }
}
`;

export const CHANGE_TITLE = gql`
mutation changeTitleMutation (
  $qid: Int!
  $title: String!
  $description: String!
) {
  changeTitle (
    qid: $qid
    title: $title
    description: $description
  ) {
    id
    title
    description
  }
}
`;

export const QUIZ_CREATION = gql`
mutation QuizCreate(
  $title: String!
  $description: String!
  ) {
  createQuiz(
    title: $title
    description: $description
  ) {
    id
    title
    description
  }
}
`;

export const LOGIN_MUTATION = gql`
  mutation LoginMutation(
    $username: String!
    $password: String!
  ) {
    login(
      username: $username
      password: $password
    ) {
      token
    }
  }
`;

export const DELETE_USER = gql`
mutation {
  deleteAcc {
    result
  }
}
`;

export const SIGNUP_MUTATION = gql`
  mutation SignupMutation(
    $username: String!
    $password: String!
    $name: String!
  ) {
    signup(
      username: $username
      password: $password
      name: $name
    ) {
      token
    }
  }
`;

export const SUBMIT_TAKEN = gql`
mutation add_taken (
  $quizId: Int!
  $quizName: String!
  $name: String!
  $description: String!
  $score: Int!
) {
  addTaken (
    quizId: $quizId
    quizName: $quizName
    name: $name
    description: $description
    score: $score
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

export const SUBMIT_OTHERS = gql`
mutation add_others (
  $quizId: Int!
  $name: String!
  $description: String!
  $score: Int!
) {
  addOthers (
    quizId: $quizId
    name: $name
    description: $description
    score: $score
  ) {
    id
    name
    description
    score
  }
}
`;

export const PUBLISH_QUIZ = gql`
mutation publish_quiz (
  $qid: Int!
) {
  publishQuiz (
    qid: $qid
  ) {
    id
    title
    description
    published
  }
}
`;