let allIssues = [];

const issueLoaded = () => {
    fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues')
        .then((res) => res.json())
        .then((json) => {
            allIssues = json.data;    // Save it to memory
            displayIssues(allIssues); // Show it on screen
        })

}

const filterByStatus = (status) => {
    if (!status || status == 'all') {
        displayIssues(allIssues);

    }
    else {
        const filterd = allIssues.filter(item => item.status == status);
        displayIssues(filterd)
    }
}

const displayIssues = (data) => {
    const issueContainer = document.getElementById('issue-container');
    issueContainer.innerHTML = "";

    data.forEach(element => {
        const card = document.createElement("div");


        // Icon selctions
        const icons = {
            'bug': 'fa-bug',
            'documentation': 'fa-file-lines',
            'enhancement': 'fa-wand-magic-sparkles',
            'help wanted': 'fa-handshake-angle',
            'good first issue': 'fa-star'
        };

        // 2. Get icons for both labels (falling back to fa-tag or fa-circle-info if not found)
        const iconClass1 = icons[element.labels[0]] || 'fa-circle-info';
        const iconClass2 = icons[element.labels[1]] || 'fa-tag';


        // If it's 'help wanted' -> orange, otherwise -> green
        const label2Color = element.labels[1] === 'help wanted'
            ? 'border-orange-500 text-orange-500'
            : 'border-green-500 text-green-500';


        // Border top from challange part
        const statusBorder = element.status === 'open' ? 'border-t-4 border-t-green-500' : 'border-t-4 border-t-purple-500';

        card.innerHTML = `
        <div onclick="openMyModal(${element.id})" class="card space-y-8 border border-gray-200 shadow-md ${statusBorder}">
                    <div class="status">
                        <span class="btn rounded-full">${element.priority}</span>
                    </div>
                    <div class="card-content  space-y-4">
                        <div class="">
                            <h3 class="font-bold">${element.title}</h3>
                            <p class=" text-gray-500 text-[80%]">${element.description}</p>
                        </div>
                        <div class="issues flex flex-wrap">
                            <button class="btn text-red-500 btn-outline btn-error hover:text-white rounded-full"><i class="fa-solid ${iconClass1}"></i></i>${element.labels[0]}</button>
                            <button 
    class="btn rounded-full ${label2Color} ${element.labels[1] ? '' : 'hidden'}" 
    id="issue-2">
    <i class="fa-solid ${iconClass2}"></i>
    ${element.labels[1]}
</button>
                        </div>
                        <hr class=" border-gray-300">
                        <div class="extension flex justify-between w-[100%] gap-8">
                            <div class="">
                                <p class="extention-p">#${element.id} by ${element.author}</p>
                                <p class="extention-p">Updated by : ${element.assignee}</p>
                            </div>    
                                
                            <div class="">
                                <p class="extention-p">${element.createdAt}</p>
                                <p class="extention-p">${element.updatedAt}</p>
                            </div>    
                        </div>
                    </div>
    
        `
        issueContainer.appendChild(card)
        console.log(data)
    });

    document.getElementById('issues').innerText = data.length;

}


issueLoaded()

const search = () => {
    // get search value 
    const query = document.getElementById('search-input').value;

    fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${query}`)
        .then((res) => res.json())
        .then((json) => displayIssues(json.data))
}


const openMyModal = (id) => {
    // 1. Fetch the specific issue data using the ID
    fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`)
        .then(res => res.json())
        .then(json => {
            const issue = json.data;
            const modal = document.getElementById('my_modal_1');


            // Icon selctions
            const icons = {
                'bug': 'fa-bug',
                'documentation': 'fa-file-lines',
                'enhancement': 'fa-wand-magic-sparkles',
                'help wanted': 'fa-handshake-angle',
                'good first issue': 'fa-star'
            };

            // 2. Get icons for both labels (falling back to fa-tag or fa-circle-info if not found)
            const iconClass1 = icons[issue.labels[0]] || 'fa-circle-info';
            const iconClass2 = icons[issue.labels[1]] || 'fa-tag';

            // 2. Change element to issue here
            const label2Color = issue.labels[1] === 'help wanted'
                ? 'border-orange-500 text-orange-500'
                : 'border-green-500 text-green-500';



            modal.innerHTML = `
                <div class="modal-box max-w-2xl">
                    <h3 class="text-2xl mt-8 font-bold">${issue.title}</h3>
                <div class="flex gap-4 items-start">
                        <span class="badge badge-primary">${issue.status}</span>
                        <p class="text-gray-500">${issue.status} by ${issue.author}   .${issue.createdAt}</p>
                    </div>
                    <div class="issues mt-8 flex flex-wrap">
                            <button class="btn text-red-500 btn-outline btn-error hover:text-white rounded-full"><i class="fa-solid ${iconClass1}"></i></i>${issue.labels[0]}</button>
                            <button 
    class="btn rounded-full ${label2Color} ${issue.labels[1] ? '' : 'hidden'}" 
    id="issue-2">
    <i class="fa-solid ${iconClass2}"></i>
    ${issue.labels[1]}
</button>
                        </div>
                    
                    <p class="py-6 text-gray-600 border-b border-gray-100">${issue.description}</p>
                    
                    <div class="grid grid-cols-2 gap-4 py-4 text-sm">
                        <div>
                            <p class="">assignee:</p>
                            <p class="font-semibold">${issue.assignee}</p>
                        </div>
                        <div>
                            <p class="font-semibold">Priority</p>
                            <p class="btn capitalize text-red-500">${issue.priority}</p>
                        </div>
                    </div>

                    <div class="modal-action">
                        <form method="dialog">
                            <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                            <button class="btn">Close</button>
                        </form>
                    </div>
                </div>
            `;

            // 3. Finally, show the modal
            modal.showModal();
        })

}