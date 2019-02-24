import Job from "./models/Job";

for (let i = 0; i < 10; i++)
{
    const job = new Job({
        company: "Company Name",
        location:[Math.random() * 100, Math.random() * 100 ],
        title: "Job Title",
        description: "This is a job description.",
        pay: Number(Math.random() * 100000).toFixed(2),
        applyLink: "https://google.com/"
    });

    job.save().then((job: any) =>
    {
        console.log(job);
    }).catch((error: any) => { console.log(error) })
}

//process.exit();