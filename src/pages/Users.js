import { useMemo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Nav } from "../components/Nav";
import { NavLateral } from "../components/Nav-lateral";
import { Pagination } from "../components/pagination";
import { LinkList, NumberTd, StateUser, TableTd } from "../styles/style";

import { ContainerColumn, ContainerPage, Table } from "../styles/containers";
import { Id, TrHead, TRow, UserName } from "../styles/style";
import { LightButton } from "../styles/style-buttons";

import {
  fetchUsers,
  removeUser,
  selectStateUsers,
} from "../features/users/UsersSlice";
import { Image } from "../styles/style-image";
import { AddUser } from "../features/users/AddUser";

let PageSize = 10;

export function Users({ open, setOpen }) {
  const users = useSelector(selectStateUsers);
  const dispatch = useDispatch();
  const [usersData, setUsersData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [openModal, setOpenModal] = useState(false);

  const handleOpen = () => {
    setOpenModal(true);
  };
  const handleClose = () => {
    setOpenModal(false);
  };

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  useEffect(() => {
    setUsersData(users);
  }, [users]);

  const handleRemove = (id) => {
    dispatch(removeUser(id));
    setUsersData(usersData.filter((users) => users._id !== id));
  };

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return usersData.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, usersData]);

  return (
    <ContainerPage>
      <NavLateral open={open} setOpen={setOpen} />
      <ContainerColumn>
        <Nav title="Users List" open={open} setOpen={setOpen} />
        <div>
          <AddUser openModal={openModal} handleClose={handleClose} />
          <LightButton onClick={handleOpen}>Add New User</LightButton>
        </div>
        <Table>
          <thead>
            <TrHead style={{ fontSize: "14px" }}>
              <th
                style={{
                  width: "120px",
                  borderTopLeftRadius: "20px",
                  padding: "10px 20px",
                }}
              >
                Photo
              </th>
              <th>User</th>
              <th>Job</th>
              <th
                style={{
                  width: "200px",
                }}
              >
                Email
              </th>
              <th>Phone</th>
              <th>Start Date</th>
              <th>Functions</th>
              <th
                style={{
                  width: "110px",
                }}
              >
                Status
              </th>
              <th
                style={{
                  borderTopRightRadius: "20px",
                  padding: "20px",
                  width: "40px",
                }}
              ></th>
            </TrHead>
          </thead>
          <tbody>
            {currentTableData.map((user) => (
              <TRow key={user._id}>
                <td
                  style={{
                    padding: "10px",
                  }}
                >
                  <Image src={user.photo} alt="" />
                </td>
                <td>
                  <LinkList to={`/users/${user._id}`}>
                    <UserName>{user.full_name}</UserName>
                    <Id style={{ fontSize: "5px" }}>{user._id}</Id>
                  </LinkList>
                </td>
                <td style={{ fontSize: "10px" }}>{user.job_title}</td>
                <TableTd>{user.email}</TableTd>
                <NumberTd>
                  <span>📞</span>
                  {user.phone_number}
                </NumberTd>
                <NumberTd>{user.start_date.slice(0, 10)}</NumberTd>
                <TableTd>{user.working_functions}</TableTd>
                <StateUser status={user.working_situation}>
                  {user.working_situation}
                </StateUser>

                <td>
                  <div
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      handleRemove(user._id);
                    }}
                  >
                    🗑️
                  </div>
                </td>
              </TRow>
            ))}
          </tbody>
        </Table>

        <Pagination
          currentPage={currentPage}
          totalCount={users.length}
          pageSize={PageSize}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </ContainerColumn>
    </ContainerPage>
  );
}
