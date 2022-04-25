exports.tutorial = async function (req) {
    const tutorial = {   
        title: req.body.title,
        content: req.body.content,
        author: req.body.author,
        created_at: req.body.created_at,
        is_published: req.body.is_published, 
    }
    return tutorial;
}