import { SubCategoryModel } from "../../Models/SubCategoryModel";
import { subCategoriesService } from "../../Services/SubCategoriesService";
import { notify } from "../../Utils/Notify";
import { useState } from "react";

interface EditSubCategoryProps {
  subCategory: SubCategoryModel;
  open: boolean;
  onClose: () => void;
  handleSubCategoryUpdated: (updatedSubCategory: SubCategoryModel) => void;
}

export default function EditSubCategory({
  subCategory,
  open,
  onClose,
  handleSubCategoryUpdated,
}: EditSubCategoryProps): JSX.Element {
  const [newName, setNewName] = useState("");

  async function editSubCategory(_id: string) {
    try {
      if (!newName) {
        notify.error("Please enter a valid subcategory name.");
        return;
      }
      await subCategoriesService.updateSubCategory({ _id, name: newName });
      notify.success(
        `Sub category ${subCategory.name} has changed to ${newName} successfully.`
      );
      handleSubCategoryUpdated({ _id, name: newName });
      onClose();
    } catch (err: any) {
      notify.error(err);
    }
  }

  return (
    <>
      {open && (
        <div className="fixed z-1 inset-0 overflow-y-auto flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative bg-white rounded-lg shadow-xl p-8 max-w-sm w-full">
            <div className="mb-6">
              <h2 className="text-xl font-bold mb-4">Edit Subcategory Name</h2>
              <p className="text-sm text-gray-600 mb-4">
                Please enter the new name for the subcategory:
              </p>
              <input
                type="text"
                placeholder="New Name"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === "Enter" && newName.trim() !== "") {
                    e.preventDefault();
                    editSubCategory(subCategory._id);
                  }
                }}
              />
            </div>
            <div className="flex justify-end">
              <div
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg mr-2 transition duration-300"
                onClick={() => {
                  editSubCategory(subCategory._id);
                }}
              >
                Save
              </div>
              <div
                className="bg-gray-300 hover:bg-gray-400 text-gray-600 px-4 py-2 rounded-lg transition duration-300"
                onClick={onClose}
              >
                Cancel
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
