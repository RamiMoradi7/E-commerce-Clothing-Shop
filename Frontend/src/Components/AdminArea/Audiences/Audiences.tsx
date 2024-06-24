import { AppState } from "../../../Redux/AppState";
import { audiencesService } from "../../../Services/AudiencesService";
import { useFetch } from "../../../hooks/useFetch";
import AddButton from "../../Common/Buttons/AddButton/AddButton";
import DeleteButton from "../../Common/Buttons/DeleteButton/DeleteButton";
import EditButton from "../../Common/Buttons/EditButton/EditButton";
import Loader from "../../Common/Loader/Loader";

export default function Audiences(): JSX.Element {
  const { result: audiences, isLoading } = useFetch(
    audiencesService.getAll,
    (appState: AppState) => appState.audiences
  );
  if (isLoading) {
    return <Loader />;
  }
  return (
    <>
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8 flex justify-between items-start">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Audiences
          </h2>

          <AddButton title="Audience" identifier="audiences" />
        </div>

        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {audiences?.map((a) => (
              <div
                key={a._id}
                className="bg-white font-semibold text-center rounded-3xl border shadow-lg p-4 max-w-xs"
              >
                <div className="flex justify-between items-center mt-4">
                  <EditButton identifier="audiences" _id={a._id} />
                  <DeleteButton
                    _id={a._id}
                    name={a.name}
                    fnQuery={audiencesService.deleteOne}
                  />
                </div>
                <h1 className="text-lg text-gray-700">{a.name}</h1>
                <p className="text-xs text-gray-800 mt-4 overflow-hidden overflow-y-auto  max-h-32">
                  {a.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
