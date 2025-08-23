import {useState} from 'react'
import {ArrowLeftIcon} from 'lucide-react'
import {Link,useNavigate} from "react-router"
import toast from "react-hot-toast"
import api from '../utils/api.js'

const CreatePage = () => {
  const [title,setTitle] = useState("")
  const [content,setContent] = useState("")
  const [loading,setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(title)
    console.log(content)
    if(!title.trim() || !content.trim()){
      toast.error("All fields are required")
      return
    }
    setLoading(true)
    try {
      await api.post("/notes",{
        title,
        content
      })
      toast.success("Note created successfully")
      navigate("/")
    } catch (error) {
      if(error.response.status === 429){
        toast.error("Rate Limit reached. Please try again later!",{
          duration: 4000,
          icon: "🚫"
        })
      }
      else{
        toast.error("Failed to create note")
        console.error("Error: ",error)
      }
    }
    finally{
      setLoading(false)
    }
  }

  return (
  <div className="min-h-screen bg-base-200">
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto mb-3">
        <Link to={"/"} className="btn btn-primary btn-outline">
        <ArrowLeftIcon className="size-5"/>
        Back to Notes
        </Link>
        <div className="card bg-base-100 mt-20">
          <div className="card-body">
            <h2 className="card-title text-2xl mb-9">Create New Note</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-control mb-8">
                <label className="label-text mb-2">Title</label>
                <input type="text" placeholder="Enter Title" className="input input-bordered hover:border-green-200 focus:border-green-300" value={title} onChange={(e) => setTitle(e.target.value)} />
              </div>
              <div className="form-control mb-8">
                <label className="label-text mb-2">Description</label>
                <textarea placeholder="Enter Content" className="textarea textarea-bordered h-40 hover:border-green-200 focus:border-green-300" value={content} onChange={(e) => setContent(e.target.value)}>
                </textarea>
              </div>
              <div className="card-actions justify-end">
                <button type="submit" className="btn btn-primary" disabled={loading}>
                  {loading ? "Creating...." : "Create Note"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default CreatePage