import {
  getusersbyids,
  getcommentsbypostids,
  getquestionsbycreator,
  getquestionsbyfollow,
  getanswersbycreator,
  getanswersbylike,
  userinfo,
} from "../api";

export const getQAsbyPerson = async (
  personid,
  answerdispatch,
  questiondispatch,
  persondispatch,
  commentdispatch
) => {
  //api
  const person = (await userinfo({ userid: personid })).data;

  //own questions:
  const ownquestions = (await getquestionsbycreator(personid)).data;

  // follow questions
  const followquestions = (await getquestionsbyfollow(personid)).data;

  const diffquestions = followquestions.filter((question) =>
    ownquestions.find((q) => q._id === question._id) ? false : true
  );

  const questions = [...diffquestions, ...ownquestions];
  //own answers
  const ownanswers = (await getanswersbycreator(personid)).data;

  // like answers
  const likeanswers = (await getanswersbylike(personid)).data;

  const diffanswers = likeanswers.filter((answer) =>
    ownanswers.find((q) => q._id === answer._id) ? false : true
  );
  const answers = [...diffanswers, ...ownanswers];

  //
  //followers id
  const followersids = person.followers.map((p) => p._id);

  //followings id
  const followingids = person.followings.map((p) => p._id);

  const personids = [
    ...ownquestions,
    ...ownanswers,
    ...followquestions,
    ...likeanswers,
  ].map((element) => element.creator._id);

  const uniquepersonids = [
    ...new Set([...personids, personid, ...followersids, ...followingids]),
  ];

  const persons = (await getusersbyids({ ids: uniquepersonids })).data;

  const postids = [
    ...ownquestions,
    ...ownanswers,
    ...followquestions,
    ...likeanswers,
  ].map((answer) => answer._id);

  const uniquepostids = [...new Set(postids)];

  const comments = (await getcommentsbypostids({ postids: uniquepostids }))
    .data;

  //dispatch

  persondispatch({ type: "getfollowers", payload: persons });

  commentdispatch({ type: "getall", payload: comments });

  answerdispatch({
    type: "getallanswers",
    payload: answers,
  });

  questiondispatch({
    type: "getallquestions",
    payload: questions,
  });
  // } catch (error) {
  //   if (error.response) console.log(error.response.data);
  // }
};
