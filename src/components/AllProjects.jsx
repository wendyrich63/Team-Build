import translateStatusToWord from "./translateProjectStatus";
import determineActionByProjectStatus from "./determineActionByProjectStatus";
import determineNewStatus from "./determineNewStatus";

// Return the line item for the developers active project.
export default function AllProjects({
  project, updateStatusFunc
 }) {
//This function fires off the code when button 1 is clicked
function handleClick1() {
  console.log(updateStatusFunc, project.projects.project_id)
  const newStatus = determineNewStatus(project.projects.status, 1)
  return updateStatusFunc(project.projects.project_id, newStatus);
}

//This function fires off the code when button 2 is clicked
function handleClick2() {
  console.log(updateStatusFunc, project.projects.project_id)
  const newStatus = determineNewStatus(project.projects.status, 2)
  return updateStatusFunc(project.projects.project_id, newStatus);
}



  return (
    <li className="lg:grid lg:grid-cols-8 lg:border-b lg:border-slate-400 lg:mr-20 border-b border-slate-700 pb-4 pr-5">
      <input className="col-span-1 font-bold pt-1"
                type="checkbox"
                // onChange={handleChkBoxInput}
                // value={registration.possible_mentor}
      />
      <p className="col-span-2 font-bold pt-1">{project.charityName}</p>
      <p className="col-span-2 font-bold pt-1">{project.projects.title}</p>
      <p className="col-span-1 flex flex-wrap mr-5 lg:ml-6">{translateStatusToWord(project.projects.status)}</p>{" "}
      <span className="col-span-1 grid gap-3 mt-4">
        <button
          className="button border-4 border-emerald-500 lg:w-32 lg:h-10 w-44 h-18 text-md text-center text-black font-bold justify-self-end"
          onClick={handleClick1} >
          {determineActionByProjectStatus(project.projects.status, 1)}
        </button>
      </span>
      <span className="col-span-1 grid gap-3 mt-4">
        <button
          className="button border-4 border-emerald-500 lg:w-32 lg:h-10 w-44 h-18 text-md text-center text-black font-bold justify-self-end"
          onClick={handleClick2}  >
         {determineActionByProjectStatus(project.projects.status, 2)}
        </button>
      </span>
    </li>
  );
}