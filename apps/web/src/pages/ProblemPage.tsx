import { useState, useEffect } from "react";
import Editor from "../components/Editor";
// import MarkdownEditor from "@uiw/react-markdown-editor";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { asyncSingleProblemGet } from "../store/ProblemSlice";
import { RootState } from "../store/store";

function ProblemPage() {
    const [bottomDrawer, setBottomDrawer] = useState("input");
    const [verdict, setVerdict] = useState("tle");
    const dispatch = useDispatch();
    const problem = useSelector(
        (state: RootState) => state.problem.singleProblem
    );
    const location = useLocation().pathname.split("/")[2];

    useEffect(() => {
        dispatch(asyncSingleProblemGet(location) as any);
    }, []);


    return (
        <div className="flex">
            <div className="flex-grow h-screen overflow-y-auto sc1 problemPage p-2 px-4">
                {/* <MDEditor.Markdown
          source={problem?.statement}
        /> */}
                <h1 className="text-3xl py-3 border-b capitalize">{problem?.title}</h1>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit sunt
                    earum vel consequatur officiis perferendis accusantium, reiciendis
                    debitis reprehenderit facilis saepe fuga deserunt minima repudiandae
                    voluptates harum impedit illum ullam voluptatem laborum? Esse eius
                    labore, quo sapiente reiciendis sint commodi eaque adipisci
                    perferendis, odio minus, laboriosam libero neque fugiat ad iusto modi
                    repellat! Distinctio velit error asperiores nam facere quae placeat a
                    hic deleniti, accusantium mollitia fugit eaque sint magnam tenetur
                    aliquid! Quam, accusamus perferendis quas eos, fugiat cumque veritatis
                    molestiae deserunt architecto nulla ducimus aperiam esse minima
                    delectus nobis earum, aliquam id alias qui. Tenetur eveniet quaerat in
                    eius ea possimus corrupti! Officia commodi eligendi omnis minima sit
                    at iusto porro facere quam, quo aut reiciendis quia quasi, doloremque
                    ipsa blanditiis cum velit quae voluptatem obcaecati laudantium vero
                    alias eum. Deleniti sed eum eligendi ab temporibus iste rerum totam
                    optio nemo odio, quod architecto cupiditate ipsum quas illum rem
                    tempore hic? Officiis sint, officia optio quos non aliquam cum quis
                    voluptatum beatae fugiat, asperiores at dignissimos exercitationem
                    repellendus omnis excepturi tenetur molestiae autem iusto quia commodi
                    ducimus. Minus reiciendis quia sequi aspernatur error delectus id quis
                    a aliquid dolore libero, explicabo sunt cumque sapiente! Repudiandae
                    illum est pariatur nihil maiores nesciunt quae minima commodi quis
                    aperiam quasi assumenda, eos laborum fugit dolorum earum doloribus
                    repellendus nemo modi iste expedita sunt, mollitia impedit libero.
                </p>
            </div>
            <div className="min-w-[45%] border problemPage border-r-0 pr-0 pb-0 p-3 flex flex-col overflow-hidden">
                <div className="">
                    <Editor />
                </div>
                <div className="bg-gray-100 text-sm text-gray-700 space-x-4 p-2">
                    <button
                        className={`${bottomDrawer === "input" && "bg-white shadow"
                            } p-2 px-4 rounded-md`}
                        onClick={() => setBottomDrawer("input")}
                    >
                        Custom Input
                    </button>
                    <button
                        className={`${bottomDrawer === "output" && "bg-white shadow"
                            } p-2 px-4 rounded-md`}
                        disabled
                    >
                        Output
                    </button>
                    <button
                        className={`${bottomDrawer === "result" && "bg-white shadow"
                            } p-2 px-4 rounded-md`}
                        onClick={() => setBottomDrawer("result")}
                    >
                        Code Result
                    </button>
                </div>
                <div className="bg-gray-100 flex-grow flex flex-col items-end p-4 pt-2">
                    {bottomDrawer !== "result" ? (
                        <textarea
                            className="bg-white flex-grow w-full border outline-none p-2 text-sm font-bold rounded-sm shadow"
                            readOnly={bottomDrawer === "output"}
                        ></textarea>
                    ) : (
                        <div
                            className={`bg-white flex-grow w-full border ${verdict === "ac"
                                ? "border-green-600"
                                : verdict === "wa"
                                    ? "border-red-600"
                                    : "border-red-800"
                                } outline-none p-2 text-xl grid place-items-center font-bold rounded-sm shadow`}
                        >
                            {verdict === "ac" && (
                                <span className="text-green-600">ACCPETED</span>
                            )}
                            {verdict === "wa" && (
                                <span className="text-red-600">WRONG ANSWER</span>
                            )}
                            {verdict === "tle" && (
                                <span className="text-red-800">TIME LIMIT EXCEEDED</span>
                            )}
                        </div>
                    )}
                    <div className="space-x-4 text-sm mt-3">
                        <button className="p-2 shadow-md  px-8 border bg-white rounded-lg">
                            Run
                        </button>
                        <button className="p-2 shadow-md font-semibold px-8 border bg-slate-600 text-white rounded-lg">
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProblemPage;