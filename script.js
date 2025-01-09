const searchGitHub = async () => {
	try {
		const username = document.getElementById('search-input').value;
		const response = await fetch(`https://api.github.com/users/${username}`);

		if (!response.ok) throw new Error('User not found');

		const data = await response.json();
		displayUserDetails(data);
	} catch (error) {
		displayError(error.message);
	}
};

const displayUserDetails = (data) => {
	const details = document.querySelector('.details');
	details.style.display = 'flex';

	const userProfileHTML = `
    <img src="${
			data.avatar_url
		}" alt="Avatar" width="150"  style="border-radius: 50%;"/>
    <h2>${data.name || 'No name available'}</h2>
    <p>${data.bio || 'No bio available'}</p>
    <div class="stats">
      <div class="stat-box">
        <p><strong>Followers:</strong> ${data.followers}</p>
      </div>
      <div class="stat-box">
        <p><strong>Following:</strong> ${data.following}</p>
      </div>
      <div class="stat-box">
        <p><strong>Repositories:</strong> ${data.public_repos}</p>
      </div>
    </div>
  `;

	document.getElementById('result').innerHTML = userProfileHTML;
};

const displayError = (message) => {
	const errorHTML = `<p>Error: ${message}</p>`;
	document.getElementById('result').innerHTML = errorHTML;
};
