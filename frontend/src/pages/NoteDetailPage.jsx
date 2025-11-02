import React, { useState, useEffect } from "react";
import { ArrowLeftIcon, Trash2Icon } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router";
import api from "../utils/api.js";
import toast from "react-hot-toast";
import ConfirmModal from "../components/ConfirmModal";

const NoteDetailPage = () => {
  const [note, setNote] = useState({title:"",content:""});
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [modalUI, setModalUI] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  console.log({ id });

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await api.get(`/notes/${id}`);
        console.log(res)
        setNote(res.data);
      } catch (error) {
        console.error("Error: ", error);
        toast.error("Failed to fetch the notes");
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, [id]);

  console.log(note)

  const handleSave = async (e) => {
    e.preventDefault()
    
    if(!note.title.trim() || !note.content.trim()){
      toast.error("Please enter the title and content")
      return
    }

    setSaving(true)

    try {
      await api.put(`/notes/${id}`,note)
      toast.success("Note updated successfully")
      navigate("/")
    } catch (error) {
      console.error("Error: ",error)
      toast.error("Error updating the note")
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    try {
      await api.delete(`/notes/${id}`)
      toast.success("Note deleted successfully")
      navigate("/")
    } catch (error) {
      console.error("Error: ",error)
      toast.error("Error deleting the note")
    }
  }

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto mb-3">
          <div className="flex items-center justify-between">
            <Link to={"/"} className="btn btn-outline btn-primary">
              <ArrowLeftIcon className="size-5" />
              Back to Notes
            </Link>
            <button className="btn btn-outline btn-error" onClick={() => setModalUI(true)}>
              <Trash2Icon className="size-5" />
              Delete Note
            </button>
            {modalUI && (
              <ConfirmModal onClose={() => setModalUI(false)} onConfirm={handleDelete}/>
            )}
          </div>
          <div className="card bg-base-100 mt-20">
            <div className="card-body">
              <form>
                <div className="form-control mb-8">
                  <label className="label-text mb-2">Title</label>
                  <input
                    type="text"
                    placeholder="Enter Title"
                    className="input input-bordered hover:border-green-200 focus:border-green-300"
                    value={note.title}
                    onChange={(e) =>
                      setNote({ ...note, title: e.target.value })
                    }
                  />
                </div>
                <div className="form-control mb-8">
                  <label className="label-text mb-2">Description</label>
                  <textarea
                    placeholder="Enter Content"
                    className="textarea textarea-bordered h-40 hover:border-green-200 focus:border-green-300"
                    value={note.content}
                    onChange={(e) =>
                      setNote({ ...note, content: e.target.value })
                    }
                  ></textarea>
                </div>
                <div className="card-actions justify-end">
                  <button type="submit" className="btn btn-primary" onClick={handleSave} disabled={saving}>
                    {saving ? "Saving Notes...." : "Save Note"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteDetailPage;
