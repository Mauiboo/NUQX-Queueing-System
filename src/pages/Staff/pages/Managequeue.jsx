import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Managequeue({ windowNumber, transaction }) {
  const [queueNumbers, setQueueNumbers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const navigate = useNavigate();

  const nowServing = queueNumbers.find(
    (q) => q.status === "Processing" && q.windowNumber === windowNumber
  );
  const waitingRegular = queueNumbers.filter(
    (q) => !q.isPriority && q.status === "Waiting"
  );
  const waitingPriority = queueNumbers.filter(
    (q) => q.isPriority && q.status === "Waiting"
  );
  useEffect(() => {
    const interval = setInterval(() => {
      fetchQueueNumbers();
    }, 5000); // every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const fetchQueueNumbers = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        "http://localhost:5000/api/auth/queue-numbers-with-transactions",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ transactionName: transaction }),
        }
      );

      if (response.status === 401) {
        // Redirect to login page if unauthorized
        navigate("/login");
        return;
      }

      if (response.ok) {
        const data = await response.json();
        setQueueNumbers(data.queueNumbers);

        if (windowNumber && transaction) {
          setLoading(false);
        }
      } else {
        alert("An error occurred. Please refresh the page.");
      }
    } catch (error) {
      alert("An error occurred. Please refresh the page.");
    }
  };

  const handleUpdate = async (id, newStatus) => {
    setIsUpdating(true); // Start showing overlay
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://localhost:5000/api/auth/queue-numbers/${id}/update`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: newStatus, windowNumber }),
        }
      );

      if (response.status === 401) {
        // 🔁 Redirect to login if token is invalid or expired
        navigate("/login");
        return false;
      }

      const data = await response.json();
      if (!response.ok) {
        alert(data.message);
        await fetchQueueNumbers();
        return false;
      } else {
        setQueueNumbers((prev) =>
          prev.map((qx) =>
            qx._id === id ? { ...qx, status: newStatus, windowNumber } : qx
          )
        );

        await fetchQueueNumbers();
        return true;
      }
    } catch (error) {
      alert("Something went wrong. Please try again.");
      return false;
    } finally {
      setIsUpdating(false); // Stop showing overlay
    }
  };

  const handleNextClick = async () => {
    const firstInLine = waitingRegular.sort(
      (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
    )[0];

    if (!firstInLine) {
      alert("No more queue numbers to serve.");
      return;
    }

    const canProcessNext = await handleUpdate(firstInLine._id, "Processing");

    if (canProcessNext && nowServing) {
      await handleUpdate(nowServing._id, "Completed");
    }
  };

  const handleNextPriorityClick = async (cell) => {
    if (!cell) {
      alert("No more queue numbers to serve.");
      return;
    }

    const canProcessNext = await handleUpdate(cell._id, "Processing");

    if (canProcessNext && nowServing) {
      await handleUpdate(nowServing._id, "Completed");
    }
  };

  const handleDoneClick = async (cell) => {
    if (nowServing) {
      await handleUpdate(nowServing._id, "Completed");
    }
  };

  return (
    <>
      {isUpdating && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 1000,
          }}
        >
          <div className="flex flex-col items-center gap-2 bg-gray-800 justify-center px-4 py-2 rounded-xl">
            <div className="w-6 h-6 border-4 mt-2 border-blue-500 border-dashed rounded-full animate-spin"></div>
            <p className="text-white font-semibold">Updating...</p>
          </div>
        </div>
      )}

      <div className="mt-[8rem] ml-0 md:ml-[260px] flex flex-col px-4 md:px-10 pb-4">
        {loading ? (
          <>
            <div className="flex justify-center items-center h-[50vh]">
              <div className="flex flex-col items-center gap-2">
                <div className="w-10 h-10 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
                <p className="text-[#35408E] font-semibold">Loading...</p>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Window # */}
            <div
              className="flex self-end bg-[#35408E] text-white py-[8px] px-[15px] text-xl md:text-2xl rounded-md"
              style={{
                boxShadow: "0 2px 5px rgba(0,0,0,0.3)",
              }}
            >
              Window {windowNumber} - {transaction}
            </div>

            {/* Main content */}
            <div className="flex justify-center gap-11 flex-col mt-4">
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "wrap",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "2rem",
                }}
              >
                <div
                  className="w-[18rem] md:w-[24rem] xl:grow"
                  style={{
                    border: "1px solid black",
                    boxShadow: "2px 2px 5px black",
                    padding: "20px",
                    textAlign: "center",
                    backgroundColor: "white",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  {!nowServing ? (
                    <span className="text-gray-600 text-lg md:text-2xl mb-2">
                      No Queue is being served
                    </span>
                  ) : (
                    <>
                      <div
                        className="text-lg md:text-2xl"
                        style={{
                          fontWeight: "bold",
                          marginBottom: "15px",
                          width: "100%",
                        }}
                      >
                        Now Serving
                      </div>
                      <div
                        className="text-[50px] md:text-[65px]"
                        style={{
                          color: "#35408E",
                          marginBottom: "15px",
                          width: "100%",
                        }}
                      >
                        {nowServing.generatedQueuenumber}
                      </div>
                    </>
                  )}
                  {waitingRegular.length != 0 && (
                    <button
                      className="text-lg md:text-xl w-[90px] md:w-[110px]"
                      style={{
                        backgroundColor: "#35408E",
                        color: "white",
                        border: "none",
                        borderRadius: "10px",
                        padding: "10px 20px",
                        cursor: "pointer",
                        marginTop: "7px",
                      }}
                      onClick={handleNextClick}
                    >
                      NEXT
                    </button>
                  )}

                  {queueNumbers?.filter((q) => q.status === "Waiting")
                    .length === 0 &&
                    nowServing && (
                      <button
                        className="text-lg md:text-xl w-[90px] md:w-[110px]"
                        style={{
                          backgroundColor: "#35408E",
                          color: "white",
                          border: "none",
                          borderRadius: "10px",
                          padding: "10px 20px",
                          cursor: "pointer",
                          marginTop: "7px",
                        }}
                        onClick={handleDoneClick}
                      >
                        DONE
                      </button>
                    )}
                </div>

                {/* Now Serving Table */}
                <div
                  className="w-full max-w-[42rem] mx-auto"
                  style={{
                    maxHeight: "341px",
                    overflowY: "auto",
                    border: "1px solid #B9B9B9",
                  }}
                >
                  <table
                    style={{
                      borderCollapse: "collapse",
                      textAlign: "center",
                    }}
                  >
                    <thead>
                      <tr>
                        <th
                          className="text-[16px] md:text-[20px]"
                          style={{
                            backgroundColor: "#35408E",
                            color: "white",
                            textAlign: "center",
                            border: "1px solid #B9B9B9",
                            width: "50%",
                          }}
                        >
                          Ticket Number
                        </th>
                        <th
                          className="text-[16px] md:text-[20px]"
                          style={{
                            backgroundColor: "#35408E",
                            color: "white",
                            textAlign: "center",
                            border: "1px solid #B9B9B9",
                          }}
                        >
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {waitingRegular.length === 0 ? (
                        <tr>
                          <td
                            colSpan={2}
                            style={{
                              textAlign: "center",
                              padding: "1rem",
                              border: "1px solid #B9B9B9",
                              backgroundColor: "#f9f9f9",
                            }}
                            className="text-[16px] md:text-[20px] text-gray-600"
                          >
                            No Not-Priority Queue Numbers available
                          </td>
                        </tr>
                      ) : (
                        waitingRegular
                          .sort(
                            (a, b) =>
                              new Date(a.createdAt) - new Date(b.createdAt)
                          )
                          .map((queueNum, index) => (
                            <tr key={index}>
                              <td
                                className="text-[16px] md:text-[20px]"
                                style={{
                                  backgroundColor: "white",
                                  color: "black",
                                  textAlign: "center",
                                  border: "1px solid #B9B9B9",
                                  width: "50%",
                                }}
                              >
                                {queueNum.generatedQueuenumber}
                              </td>
                              <td
                                className="text-[16px] md:text-[20px]"
                                style={{
                                  backgroundColor: "white",
                                  color: "black",
                                  textAlign: "center",
                                  border: "1px solid #B9B9B9",
                                }}
                              >
                                {queueNum.status}
                              </td>
                            </tr>
                          ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Priority List Table */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <div
                  className="uppercase"
                  style={{
                    fontSize: "26px",
                    fontWeight: "bold",
                    marginBottom: "15px",
                  }}
                >
                  Priority List
                </div>
                <div
                  className="w-full xl:w-3/4 mx-auto"
                  style={{
                    maxHeight: "640px",
                    overflowY: "auto",
                    border: "1px solid #B9B9B9",
                  }}
                >
                  <table
                    style={{
                      borderCollapse: "collapse",
                      textAlign: "center",
                    }}
                  >
                    <thead style={{ position: "sticky", top: 0, zIndex: 1 }}>
                      <tr>
                        <th
                          className="text-[16px] md:text-[20px]"
                          style={{
                            backgroundColor: "#35408E",
                            color: "white",
                            textAlign: "center",
                            border: "1px solid #B9B9B9",
                            width: "50%",
                          }}
                        >
                          Ticket Number
                        </th>
                        <th
                          className="text-[16px] md:text-[20px]"
                          style={{
                            backgroundColor: "#35408E",
                            color: "white",
                            textAlign: "center",
                            border: "1px solid #B9B9B9",
                          }}
                        >
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {waitingPriority.length === 0 ? (
                        <tr>
                          <td
                            colSpan={2}
                            style={{
                              textAlign: "center",
                              padding: "1rem",
                              border: "1px solid #B9B9B9",
                              backgroundColor: "#f9f9f9",
                            }}
                            className="text-[16px] md:text-[20px] text-gray-600"
                          >
                            No Priority Queue Numbers available
                          </td>
                        </tr>
                      ) : (
                        waitingPriority
                          .sort(
                            (a, b) =>
                              new Date(a.createdAt) - new Date(b.createdAt)
                          )
                          .map((queueNum, index) => (
                            <tr key={index}>
                              <td
                                className="text-[16px] md:text-[20px]"
                                style={{
                                  backgroundColor: "white",
                                  color: "black",
                                  textAlign: "center",
                                  border: "1px solid #B9B9B9",
                                  width: "50%",
                                }}
                              >
                                {queueNum.generatedQueuenumber}
                              </td>
                              <td
                                className="text-[16px] md:text-[20px]"
                                style={{
                                  backgroundColor: "white",
                                  color: "black",
                                  textAlign: "center",
                                  border: "1px solid #B9B9B9",
                                }}
                              >
                                <div className="flex gap-3 items-center justify-center">
                                  <span>{queueNum.status}</span>
                                  <button
                                    onClick={() =>
                                      handleNextPriorityClick(queueNum)
                                    }
                                    type="button"
                                    className="bg-[#35408E] h-fit px-3 text-base md:text-lg py-1 rounded-lg w-fit"
                                  >
                                    Next
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Managequeue;
