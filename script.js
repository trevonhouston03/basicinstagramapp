const postBtn = document.getElementById('post-btn');
const feed = document.getElementById('feed');

postBtn.addEventListener('click', () => {
    const caption = document.getElementById('caption').value;
    const imageUrl = document.getElementById('image-url').value;

    if (!caption || !imageUrl) {
        alert("Please enter both a caption and an image URL.");
        return;
    }

    const post = document.createElement('div');
    post.className = 'post';
    post.innerHTML = `
        <img src="${imageUrl}" alt="Post image">
        <p>${caption}</p>
        <p class="like-btn">Like ❤️</p>
    `;

    const likeBtn = post.querySelector('.like-btn');
    likeBtn.addEventListener('click', () => {
        likeBtn.textContent = 'Liked ✅';
    });
    const dislikeBtn = document.createElement('p');
    dislikeBtn.className = 'dislike-btn';
    dislikeBtn.textContent = 'Dislike 💔';
    dislikeBtn.style.cursor = 'pointer';
    // Add comment section
    const commentSection = document.createElement('div');
    commentSection.className = 'comment-section';
    commentSection.style.width = '100%';
    commentSection.style.marginTop = '12px';

    const commentInput = document.createElement('input');
    commentInput.type = 'text';
    commentInput.placeholder = 'Add a comment...';
    commentInput.className = 'comment-input';
    commentInput.style.width = '80%';
    commentInput.style.padding = '6px';
    commentInput.style.marginRight = '8px';
    commentInput.style.borderRadius = '6px';
    commentInput.style.border = '1px solid #ccc';

    const commentBtn = document.createElement('button');
    commentBtn.textContent = 'Post';
    commentBtn.className = 'comment-btn';
    commentBtn.style.padding = '6px 12px';
    commentBtn.style.borderRadius = '6px';
    commentBtn.style.border = 'none';
    commentBtn.style.background = '#3897f0';
    commentBtn.style.color = '#fff';
    commentBtn.style.cursor = 'pointer';

    const commentsList = document.createElement('div');
    commentsList.className = 'comments-list';
    commentsList.style.marginTop = '8px';

    commentBtn.addEventListener('click', () => {
        const commentText = commentInput.value.trim();
        if (commentText) {
            const comment = document.createElement('p');
            comment.textContent = commentText;
            comment.style.margin = '4px 0';
            comment.style.background = '#f1f1f1';
            comment.style.padding = '6px';
            comment.style.borderRadius = '6px';
            commentsList.appendChild(comment);
            commentInput.value = '';
        }
    });

    commentSection.appendChild(commentInput);
    commentSection.appendChild(commentBtn);
    commentSection.appendChild(commentsList);
    post.appendChild(commentSection);
    dislikeBtn.addEventListener('click', () => {
        dislikeBtn.textContent = 'Disliked ❌';
    });
    // Remove all inline styles from the post and its children
    post.removeAttribute('style');
    const children = post.querySelectorAll('*');
    children.forEach(child => child.removeAttribute('style'));
    post.appendChild(dislikeBtn);
    feed.prepend(post);
    post.style.background = '#fff';
    post.style.borderRadius = '12px';
    post.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
    post.style.margin = '16px 0';
    post.style.padding = '16px';
    post.style.display = 'flex';
    post.style.flexDirection = 'column';
    post.style.alignItems = 'center';
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete 🗑️';
    deleteBtn.className = 'delete-btn';
    deleteBtn.style.padding = '6px 12px';
    deleteBtn.style.borderRadius = '6px';
    deleteBtn.style.border = 'none';
    deleteBtn.style.background = '#e74c3c';
    deleteBtn.style.color = '#fff';
    deleteBtn.style.cursor = 'pointer';
    deleteBtn.style.margin = '8px 0';
    // Direct Messages Sidebar
    let dmSidebar = document.getElementById('dm-sidebar');
    if (!dmSidebar) {
        dmSidebar = document.createElement('div');
        dmSidebar.id = 'dm-sidebar';
        dmSidebar.style.position = 'fixed';
        dmSidebar.style.right = '0';
        dmSidebar.style.top = '0';
        dmSidebar.style.width = '280px';
        dmSidebar.style.height = '100vh';
        dmSidebar.style.background = '#fafafa';
        dmSidebar.style.boxShadow = '0 0 12px rgba(0,0,0,0.08)';
        dmSidebar.style.padding = '16px';
        dmSidebar.style.overflowY = 'auto';
        dmSidebar.style.display = 'flex';
        dmSidebar.style.flexDirection = 'column';
        dmSidebar.style.zIndex = '1000';
        dmSidebar.innerHTML = `<h3 style="margin-bottom:12px;">Direct Messages</h3>`;
        document.body.appendChild(dmSidebar);
    }

    // Simulate different people
    const users = [
        { name: 'Alice', avatar: 'https://randomuser.me/api/portraits/women/1.jpg' },
        { name: 'Bob', avatar: 'https://randomuser.me/api/portraits/men/2.jpg' },
        { name: 'Charlie', avatar: 'https://randomuser.me/api/portraits/men/3.jpg' }
    ];

    // Create DM threads if not already present
    users.forEach(user => {
        let thread = dmSidebar.querySelector(`[data-user="${user.name}"]`);
        if (!thread) {
            thread = document.createElement('div');
            thread.setAttribute('data-user', user.name);
            thread.style.borderBottom = '1px solid #eee';
            thread.style.padding = '8px 0';
            thread.style.display = 'flex';
            thread.style.flexDirection = 'column';

            const header = document.createElement('div');
            header.style.display = 'flex';
            header.style.alignItems = 'center';
            header.style.marginBottom = '6px';

            const avatar = document.createElement('img');
            avatar.src = user.avatar;
            avatar.alt = user.name;
            avatar.style.width = '32px';
            avatar.style.height = '32px';
            avatar.style.borderRadius = '50%';
            avatar.style.marginRight = '8px';

            const name = document.createElement('span');
            name.textContent = user.name;
            name.style.fontWeight = 'bold';

            header.appendChild(avatar);
            header.appendChild(name);

            const messages = document.createElement('div');
            messages.className = 'dm-messages';
            messages.style.marginBottom = '6px';

            const input = document.createElement('input');
            input.type = 'text';
            input.placeholder = `Message ${user.name}...`;
            input.style.width = '70%';
            input.style.padding = '4px';
            input.style.borderRadius = '4px';
            input.style.border = '1px solid #ccc';
            input.style.marginRight = '4px';

            const sendBtn = document.createElement('button');
            sendBtn.textContent = 'Send';
            sendBtn.style.padding = '4px 8px';
            sendBtn.style.borderRadius = '4px';
            sendBtn.style.border = 'none';
            sendBtn.style.background = '#3897f0';
            sendBtn.style.color = '#fff';
            sendBtn.style.cursor = 'pointer';

            sendBtn.addEventListener('click', () => {
                const msgText = input.value.trim();
                if (msgText) {
                    const msg = document.createElement('div');
                    msg.textContent = `You: ${msgText}`;
                    msg.style.background = '#e1f5fe';
                    msg.style.padding = '4px 8px';
                    msg.style.borderRadius = '6px';
                    msg.style.margin = '2px 0';
                    messages.appendChild(msg);
                    input.value = '';
                }
            });

            thread.appendChild(header);
            thread.appendChild(messages);
            const inputRow = document.createElement('div');
            inputRow.style.display = 'flex';
            inputRow.appendChild(input);
            inputRow.appendChild(sendBtn);
            thread.appendChild(inputRow);

            dmSidebar.appendChild(thread);
        }
    });
    deleteBtn.addEventListener('click', () => {
        post.remove();
    });

    post.appendChild(deleteBtn);
    const img = post.querySelector('img');
    img.style.width = '100%';
    img.style.maxWidth = '400px';
    img.style.borderRadius = '8px';
    img.style.objectFit = 'cover';
    img.style.marginBottom = '12px';
    if (!document.getElementById('dm-sidebar')) {
        // Simulate different people
        const users = [
            { name: 'Alice', avatar: 'https://randomuser.me/api/portraits/women/1.jpg' },
            { name: 'Bob', avatar: 'https://randomuser.me/api/portraits/men/2.jpg' },
            { name: 'Charlie', avatar: 'https://randomuser.me/api/portraits/men/3.jpg' }
        ];
        let dmSidebar = document.createElement('div');
        dmSidebar.id = 'dm-sidebar';
        dmSidebar.style.position = 'fixed';
        dmSidebar.style.right = '0';
        dmSidebar.style.top = '0';
        dmSidebar.style.width = '280px';
        dmSidebar.style.height = '100vh';
        dmSidebar.style.background = '#fafafa';
        dmSidebar.style.boxShadow = '0 0 12px rgba(0,0,0,0.08)';
        dmSidebar.style.padding = '16px';
        dmSidebar.style.overflowY = 'auto';
        dmSidebar.style.display = 'flex';
        dmSidebar.style.flexDirection = 'column';
        dmSidebar.style.zIndex = '1000';
        dmSidebar.innerHTML = `<h3 style="margin-bottom:12px;">Direct Messages</h3>`;
        document.body.appendChild(dmSidebar);

        users.forEach(user => {
            let thread = document.createElement('div');
            thread.setAttribute('data-user', user.name);
            thread.style.borderBottom = '1px solid #eee';
            thread.style.padding = '8px 0';
            thread.style.display = 'flex';
            thread.style.flexDirection = 'column';

            const header = document.createElement('div');
            header.style.display = 'flex';
            header.style.alignItems = 'center';
            header.style.marginBottom = '6px';

            const avatar = document.createElement('img');
            avatar.src = user.avatar;
            avatar.alt = user.name;
            avatar.style.width = '32px';
            avatar.style.height = '32px';
            avatar.style.borderRadius = '50%';
            avatar.style.marginRight = '8px';

            const name = document.createElement('span');
            name.textContent = user.name;
            name.style.fontWeight = 'bold';

            header.appendChild(avatar);
            header.appendChild(name);

            const messages = document.createElement('div');
            messages.className = 'dm-messages';
            messages.style.marginBottom = '6px';

            const input = document.createElement('input');
            input.type = 'text';
            input.placeholder = `Message ${user.name}...`;
            input.style.width = '70%';
            input.style.padding = '4px';
            input.style.borderRadius = '4px';
            input.style.border = '1px solid #ccc';
            input.style.marginRight = '4px';

            const sendBtn = document.createElement('button');
            sendBtn.textContent = 'Send';
            sendBtn.style.padding = '4px 8px';
            sendBtn.style.borderRadius = '4px';
            sendBtn.style.border = 'none';
            sendBtn.style.background = '#3897f0';
            sendBtn.style.color = '#fff';
            sendBtn.style.cursor = 'pointer';

            sendBtn.addEventListener('click', () => {
                const msgText = input.value.trim();
                if (msgText) {
                    const msg = document.createElement('div');
                    msg.textContent = `You: ${msgText}`;
                    msg.style.background = '#e1f5fe';
                    msg.style.padding = '4px 8px';
                    msg.style.borderRadius = '6px';
                    msg.style.margin = '2px 0';
                    messages.appendChild(msg);
                    input.value = '';
                }
            });

            thread.appendChild(header);
            thread.appendChild(messages);
            const inputRow = document.createElement('div');
            inputRow.style.display = 'flex';
            inputRow.appendChild(input);
            inputRow.appendChild(sendBtn);
            thread.appendChild(inputRow);

            dmSidebar.appendChild(thread);
        });
    }
    const captionP = post.querySelector('p');
    captionP.style.fontSize = '1rem';
    captionP.style.margin = '8px 0';

    likeBtn.style.cursor = 'pointer';
    likeBtn.style.margin = '4px 0';
    dislikeBtn.style.margin = '4px 0';
    // Clear inputs
    document.getElementById('caption').value = '';
    document.getElementById('image-url').value = '';
});