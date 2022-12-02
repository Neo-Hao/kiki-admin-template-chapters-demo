import { useParams } from "react-router-dom";

const ProjectView = () => {
  const { projectId } = useParams();
  return (
    <>
      <h2>Project details </h2>
      <p>Project ID: {projectId}</p>
    </>
  );
};

export default ProjectView;
