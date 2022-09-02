import Link from "next/link";

const Post = () => {
    const id = "sjsj"

    return (
        <div>
            <h1>
                <Link href={`/post/${id}`}>SOME</Link>
            </h1>
        </div>
    )
}


export default Post