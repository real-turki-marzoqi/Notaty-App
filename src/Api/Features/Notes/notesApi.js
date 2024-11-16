import baseUrl from "../../BaseUrl";

export const getAllNotesApi = async () => {
  try {
    const response = await baseUrl.get("api/v1/notes", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    });

    if (response.status === 200) {
      return response.data;
    } else {
      console.error(`Error: Unexpected response status ${response.status}`);
      throw new Error(`Unexpected response status: ${response.status}`);
    }
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Failed to get all notes";
    console.error("Error: Get All Notes failed", errorMessage);
    throw new Error(errorMessage);
  }
};

export const changeNoteStatusApi = async (id) => {
  try {
    const response = await baseUrl.put(
      `api/v1/notes/changeStauts/${id}`, // تصحيح مسار API
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      }
    );
    if (response.status === 200) {
      return response.data;
    } else {
      console.error(`Error: Unexpected response status ${response.status}`);
      throw new Error(`Unexpected response status: ${response.status}`);
    }
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Failed to change note status";
    console.error("Error: Change Note Status failed", errorMessage);
    throw new Error(errorMessage);
  }
};


export const updateNoteApi = async (noteData, id) => {
  try {
    const response = await baseUrl.put(`api/v1/notes/${id}`, noteData, { 
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    });

    if (response.status === 200) {
      return response.data;
    } else {
      console.error(`Error: Unexpected response status ${response.status}`);
      throw new Error(`Unexpected response status: ${response.status}`);
    }
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Failed to Update note";
    console.error("Error: Update Note failed", errorMessage);
    throw new Error(errorMessage);
  }
};


export const deleteNoteApi = async (id) => {
  try {
    const response = await baseUrl.delete(`api/v1/notes/${id}`, { 
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    });

    if (response.status === 204) {
      return { success: true }; 
    } else {
      console.error(`Error: Unexpected response status ${response.status}`);
      throw new Error(`Unexpected response status: ${response.status}`);
    }
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Failed to delete note";
    console.error("Error: delete Note failed", errorMessage);
    throw new Error(errorMessage);
  }
};

export const createNoteApi= async (noteData) => {
  try {
    const response = await baseUrl.post("api/v1/notes", noteData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    });

    if (response.status === 201) {
      return response.data; 
    } else {
      console.error(`Error: Unexpected response status ${response.status}`);
      throw new Error(`Unexpected response status: ${response.status}`);
    }
  } catch (error) {
    const errorMessage = 
      error.response?.data?.message || "Failed to create new note";
    console.error("Error: Create new note failed", errorMessage);
    throw new Error(errorMessage);
  }
};
