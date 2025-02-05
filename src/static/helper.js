export const  getRemainingDays=(subscription)=> {
    const currentDate = new Date(); // Get the current date
  
    // Convert the start date into a Date object
    const startDate = new Date(subscription.start_date);
  
    // Calculate the end date by adding the subscription duration (in years) to the start date
    let endDate = new Date(startDate);
    endDate.setFullYear(endDate.getFullYear() + subscription.duration); // Add years to the start date
  
    // If there's a trial end date, use that as the end date instead
    if (subscription.trial_end_date) {
      endDate = new Date(subscription.trial_end_date);
    }
  
    // Calculate the difference in milliseconds between the current date and the end date
    const timeDiff = endDate - currentDate;
  
    // Convert the time difference from milliseconds to days
    const remainingDays = Math.floor(timeDiff / (1000 * 3600 * 24)); // Milliseconds in a day
  
    console.log("Remaining days:", remainingDays);
    

    return remainingDays;


  }