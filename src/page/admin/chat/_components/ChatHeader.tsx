import { Avatar, Button, Tooltip, Typography, Tag, Dropdown, Modal, Select, Input } from 'antd';
import { MessageSquare, MoreHorizontal, Star, UserPlus, XCircle } from 'lucide-react';
import { useEffect, useState } from 'react';

const { Text } = Typography;

interface ChatHeaderProps {
	conversation: any;
	onCloseChatMsg: (data: any) => void;
	isLoading: boolean;
	employee: {
		data: any[]
	},
	onChangeChatByEmployee: (data: any) => void
}

const ChatHeader = ({ conversation, onCloseChatMsg, isLoading, employee, onChangeChatByEmployee }: ChatHeaderProps) => {
	const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);
	const [isCloseModalOpen, setIsCloseModalOpen] = useState(false);
	const [selectedEmployee, setSelectedEmployee] = useState<string | null>(null);
	const [closeNote, setCloseNote] = useState('');
	const [noteChangeEmployee, setnoteChangeEmployee] = useState('');
	if (!conversation) return null;


	const handleTransferStaff = () => {
		const data: any = {
			id: conversation?.id,
			to_staff_id: selectedEmployee,
			note: noteChangeEmployee
		}
		// Xử lý chuyển nhân viên
		onChangeChatByEmployee(data);
		setIsTransferModalOpen(false);
		setSelectedEmployee(null);
	};

	const handleCloseConversation = () => {
		// Xử lý đóng cuộc trò chuyện
		const dataClose: any = {
			node: closeNote,
			id: conversation?.id
		}
		onCloseChatMsg(dataClose)
		setIsCloseModalOpen(false);
		setCloseNote('');
	};

	const items = [
		{
			key: 'transfer',
			label: 'Chuyển nhân viên',
			icon: <UserPlus size={16} />,
			onClick: () => setIsTransferModalOpen(true)
		},
		{
			key: 'close',
			label: 'Đóng trò chuyện',
			icon: <XCircle size={16} />,
			onClick: () => setIsCloseModalOpen(true)
		}
	];

	// Mock data nhân viên, thay thế bằng API thực tế


	return (
		<>
			<div className="bg-white p-4 border-b flex justify-between items-center h-auto">
				<div className="flex items-center gap-3">
					<Avatar
						size="large"
						src={conversation.user?.avatar}
						className="bg-blue-500"
						icon={!conversation.user?.avatar && <MessageSquare size={24} />}
					/>
					<div>
						<div className="flex items-center gap-2">
							<Text strong className="text-lg">
								{conversation.user?.name || 'Khách vãng lai'}
							</Text>
							<Tag
								color={conversation.user?.type === 'guest' ? 'orange' : 'blue'}
							>
								{conversation.user?.type === 'guest' ? 'Khách' : 'Thành viên'}
							</Tag>
						</div>
						<Text className="block text-sm text-gray-500">
							{conversation.user?.email}
						</Text>
						{conversation.user?.phone && (
							<Text className="block text-sm text-gray-500">
								SĐT: {conversation.user.phone}
							</Text>
						)}
					</div>
				</div>
				<div className="flex gap-4 items-center">
					{conversation.feedback !== null && (
						<Tooltip title="Xem đánh giá">
							<Button
								type="primary"
								icon={<Star size={16} />}
								className="bg-yellow-500 border-yellow-500 hover:bg-yellow-600"
							>
								Xem feedback
							</Button>
						</Tooltip>
					)}
					<Dropdown menu={{ items }} placement="bottomRight" trigger={['click']}>
						<Button type="text" icon={<MoreHorizontal size={20} />} />
					</Dropdown>
				</div>
			</div>

			{/* Modal chuyển nhân viên */}
			<Modal
				title="Chuyển nhân viên"
				open={isTransferModalOpen}
				onOk={handleTransferStaff}
				onCancel={() => !isLoading && setIsTransferModalOpen(false)}
				okText={isLoading ? "Đang xử lý..." : "Xác nhận"}
				cancelText="Hủy"
				confirmLoading={isLoading}
				okButtonProps={{ disabled: isLoading }}
				cancelButtonProps={{ disabled: isLoading }}
			>
				<div className="py-4">
					<Input.TextArea
						required
						rows={4}
						placeholder="Nhập ghi chú khi đóng cuộc trò chuyện"
						value={noteChangeEmployee}
						onChange={(e: any) => setnoteChangeEmployee(e.target.value)}
					/>
					<Text className="block mb-2">Chọn nhân viên:</Text>
					<Select
						className="w-full"
						placeholder="Chọn nhân viên"
						options={employee?.data?.map((emp) => ({
							value: emp.id,
							label: emp?.name + "_" + emp?.email
						}))}
						onChange={(value) => setSelectedEmployee(value)}
					/>

				</div>
			</Modal>

			{/* Modal đóng cuộc trò chuyện */}
			<Modal
				title="Đóng cuộc trò chuyện"
				open={isCloseModalOpen}
				onOk={handleCloseConversation}
				onCancel={() => setIsCloseModalOpen(false)}
				okText="Xác nhận"
				cancelText="Hủy"
			>
				<div className="py-4">
					<Text className="block mb-2">Ghi chú:</Text>
					<Input.TextArea
						rows={4}
						placeholder="Nhập ghi chú khi đóng cuộc trò chuyện"
						value={closeNote}
						onChange={(e: any) => setCloseNote(e.target.value)}
					/>
				</div>
			</Modal>
		</>
	);
};

export default ChatHeader; 