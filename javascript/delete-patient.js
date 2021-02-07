async function deleteFormHandler(event) {
    event.preventDefault();
  
    const id = window.location.toString().split('/')[
      window.location.toString().split('/').length - 1
    ];
    const response = await fetch(`/api/patient/${id}`, {
      method: 'DELETE'
    });
  
    if (response.ok) {
      document.location.replace('/homepage/');
    } else {
      alert(response.statusText);
    }
  }
  
  document.querySelector('.delete-patient-btn').addEventListener('click', deleteFormHandler);
  