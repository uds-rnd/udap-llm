const express = require("express");
const axios = require("axios");
const cors = require("cors");
const OpenAI = require("openai");
require("dotenv").config();
const maria = require("./maria");

const app = express();
const PORT = 5959;

app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.USER_KEY,
});

const assistantId = process.env.ASSISTANT_KEY;
let pollingInterval;

maria.connect();

// const threadByUser = {};

async function createThread() {
  console.log("새로운 스레드 생성 중...");
  const thread = await openai.beta.threads.create();
  return thread;
}

async function addMessage(threadId, message) {
  console.log("스레드에 메시지 추가 " + threadId);
  const response = await openai.beta.threads.messages.create(threadId, {
    role: "user",
    content: message,
  });
  return response;
}

async function runAssistant(threadId) {
  console.log("Assistant 실행: " + threadId);
  const response = await openai.beta.threads.runs.create(threadId, {
    assistant_id: assistantId,
  });

  console.log(response);

  return response;
}

async function checkingStatus(res, threadId, runId) {
  const runObject = await openai.beta.threads.runs.retrieve(threadId, runId);

  const status = runObject.status;
  console.log(runObject);
  console.log("status: ", status);

  if (status == "completed") {
    clearInterval(pollingInterval);

    const messagesList = await openai.beta.threads.messages.list(threadId);
    let messages = [];

    messagesList.body.data.forEach((message) => {
      messages.push(message.content);
    });

    res.json({ messages });
  }
}

app.get("/thread", (req, res) => {
  createThread().then((thread) => {
    res.json({ threadId: thread.id });
  });
});

app.post("/llm", async (req, res) => {
  const { message, threadId } = req.body;
  addMessage(threadId, message).then((message) => {
    // res.json({ messageId: message.id });

    runAssistant(threadId).then((run) => {
      const runId = run.id;

      pollingInterval = setInterval(() => {
        checkingStatus(res, threadId, runId);
      }, 5000);
    });
  });
});

app.post("/dbtest", async (req, res) => {
  maria.query(
    `SELECT * FROM row_table 
        WHERE prDid = 82 
        AND rowLid = 15 
        AND rowSid = 3
        AND (rowCid = 5 OR rowCid = 9 OR rowCid = 12 OR rowCid = 1)
        AND rowRid IN (
            SELECT rowRid
            FROM row_table
                WHERE prDid = 82 
                AND rowLid = 15
                AND rowSid = 3 
                AND rowVal = 'PM1'
  );`,
    function (err, rows) {
      let resRow = [];
      let resXArr = [];
      let resYArr = [];

      rows.forEach((row, idx) => {
        resRow[row.rowSeq - 1] = {
          ...resRow[row.rowSeq - 1],
          [row.rowCid]: row.rowVal,
        };
      });

      resRow.forEach((row, idx) => {
        if (row["5"].length !== 0 && /\d/.test(row["9"])) {
          resYArr.push(Number(row["5"]));
          resXArr.push(row["9"]);
        }
      });

      res.send({
        status: "OK",
        body: {
          rowData: resRow,
          graphData: {
            labels: resXArr,
            datasets: [
              {
                data: resYArr,
              },
            ],
          },
          flag: "graph",
        },
      });
    }
  );
});

// 사용 X
app.post("/llmaxios", async (req, res) => {
  try {
    const { question } = req.body;
    console.log("env", process.env.ASSISTANT_API_URL, process.env.API_KEY);
    console.log("question:", question);
    const response = await axios.post(
      process.env.ASSISTANT_API_URL,
      {
        model: "gpt-4",
        messages: [{ role: "user", content: question }],
        max_tokens: 2000,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.API_KEY}`,
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    console.log("API 호출 에러 발생:", error.message);
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}...`);
});
